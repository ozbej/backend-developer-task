# Setup

From this folder run `docker compose up`. After that, the API is running (note that mySQL takes ~30 seconds to start up initially).

- API is running on http://localhost:5000/api/
- Swagger API documentation is running on http://localhost:5000/api-docs/
- phpMyAdmin is running on http://localhost:8080/

# API Functionality

Notes API supports:

- CRUD actions for folders
- CRUD actions for notes
- Sorting
  - By note shared option
  - By note heading
- Filtering
  - By note folder
  - By note shared option
  - By note text
