# API Documentation

Base URL:

```text
http://localhost:5000/api
```

Protected endpoints require:

```text
Authorization: Bearer <token>
```

## Response Format

Success:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Enter a valid email"
    }
  ]
}
```

## Auth

### Register

`POST /auth/register`

Body:

```json
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com",
  "password": "password123",
  "role": "sales"
}
```

Roles:

- `admin`
- `sales`

### Login

`POST /auth/login`

Body:

```json
{
  "email": "rahul@example.com",
  "password": "password123"
}
```

### Current User

`GET /auth/me`

Protected: yes

## Leads

Lead fields:

- `name`
- `email`
- `status`: `new`, `contacted`, `qualified`, `lost`
- `source`: `website`, `instagram`, `referral`
- `createdAt`

### List Leads

`GET /leads`

Protected: yes

Query parameters:

- `status`
- `source`
- `search`
- `sort`: `latest` or `oldest`
- `page`

Pagination limit is fixed at 10 records per page.

Example:

```text
/leads?status=qualified&source=instagram&search=Rahul&sort=latest&page=1
```

### Create Lead

`POST /leads`

Protected: yes

Allowed roles: `admin`, `sales`

Body:

```json
{
  "name": "Rahul Sharma",
  "email": "rahul.lead@example.com",
  "status": "new",
  "source": "instagram"
}
```

### Get Single Lead

`GET /leads/:id`

Protected: yes

### Update Lead

`PATCH /leads/:id`

Protected: yes

Allowed roles: `admin`, `sales`

Body can include any lead fields:

```json
{
  "status": "qualified"
}
```

### Delete Lead

`DELETE /leads/:id`

Protected: yes

Allowed roles: `admin`

### Export Leads CSV

`GET /leads/export`

Protected: yes

Supports the same filters as `GET /leads`.

Example:

```text
/leads/export?status=qualified&source=instagram&search=Rahul
```
