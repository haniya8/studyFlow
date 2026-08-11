GET /api/tasks/stats

Returns aggregate task counts for the currently authenticated user, used to populate the dashboard stat cards.

Authentication: Required — Authorization: Bearer <token> header must be present and valid.

Method & URL

GET /api/tasks/stats

Headers

Header	Required	Value
Authorization	Yes	Bearer <jwt_token>

Request Body

None.

Query Parameters

None.

Success Response — 200 OK

json
{
  "total": 2,
  "completed": 2,
  "inProgress": 0,
  "overdue": 0
}
Field	Type	Description
total	number	Total number of tasks belonging to the user
completed	number	Tasks where completed: true
inProgress	number	Tasks where completed: false (regardless of due date)
overdue	number	Tasks where completed: false and dueDate is in the past

Note: inProgress and overdue are not mutually exclusive — a task that is both unfinished and past its due date is counted in both. The four numbers are not expected to sum to total.

Error Responses

Status	Body	When
401 Unauthorized	{ "error": "No token provided." }	Authorization header missing or malformed
401 Unauthorized	{ "error": "Invalid or expired token." }	Token signature invalid, or token expired
500 Internal Server Error	{ "error": "Something went wrong. Please try again." }	Unexpected server/DB error