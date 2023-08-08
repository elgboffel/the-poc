use axum::{
    http::StatusCode,
    routing::{get, post},
    Json, Router,
};
use serde::{Deserialize, Serialize};
use std::{error::Error, net::SocketAddr};
use utoipa::{OpenApi, ToSchema};
use utoipa_swagger_ui::SwaggerUi;

#[derive(OpenApi)]
#[openapi(paths(get_user, create_user), components(schemas(User)))]
pub struct ApiDoc;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let addr = SocketAddr::from(([127, 0, 0, 1], 3001));

    let app = Router::new()
        .merge(SwaggerUi::new("/docs").url("/api-doc/openapi.json", ApiDoc::openapi()))
        .route("/get-user", get(get_user))
        .route("/create-user", post(create_user));

    println!("listening on {}", addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
    Ok(())
}

#[utoipa::path(
	get,
    path = "/get-user",
    responses(
			(status = 200, body = [User])
    )
)]
async fn get_user() -> (StatusCode, Json<User>) {
    (
        StatusCode::OK,
        Json(User {
            id: 1337,
            username: None,
        }),
    )
}

#[utoipa::path(
	post,
    path = "/create-user",
    responses(
			(status = 201, body = [User])
    )
)]
async fn create_user(
    // this argument tells axum to parse the request body
    // as JSON into a `CreateUser` type
    Json(payload): Json<CreateUser>,
) -> (StatusCode, Json<User>) {
    // insert your application logic here
    let user = User {
        id: 1337,
        username: Some(String::from("Johnny Kristensen")),
    };

    // this will be converted into a JSON response
    // with a status code of `201 Created`
    (StatusCode::CREATED, Json(user))
}

// the input to our `create_user` handler
#[derive(Deserialize)]
struct CreateUser {
    username: String,
}

// the output to our `create_user` handler
#[derive(Serialize, ToSchema)]
struct User {
    id: u64,
    username: Option<String>,
}
