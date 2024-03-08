POST https://mccode.commercelayer.io/oauth/token
Accept: application/json
Content-Type: application/json
{
  "grant_type": "client_credentials",
  "client_id": "5Ifo4HNmYSGJ_annYocJjTHcd6OekJaLv78dg3TqErk",
  "client_secret": "SvNFddu7U6M9OUUOSMGci6T_zEBnQSHTWyg41FCz2kA"
}
HTTP 200
[Captures]
token: jsonpath "$['access_token']"


GET https://mccode.commercelayer.io/api/skus/BrxeSlyQjZ
Accept: application/vnd.api+json
Authorization: Bearer {{token}}

#GET https://data.commercelayer.app/schemas/openapi.json
#Accept: application/vnd.api+json



