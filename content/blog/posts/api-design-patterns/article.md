# API Design Patterns That Scale

Good API design isn't about following REST religiously. It's about building interfaces that remain usable and maintainable as requirements change.

## Versioning Strategy

Pick one and stick with it:

- **URL versioning**: `/v1/users` - Simple, explicit, easy to route
- **Header versioning**: `Accept: application/vnd.api+json;version=1` - Cleaner URLs, harder to test

I prefer URL versioning. It's obvious, cacheable, and works with every HTTP client.

## Error Handling

Return structured errors. Always.

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address"
      }
    ]
  }
}
```

Use appropriate HTTP status codes:
- 400: Client did something wrong
- 401: Not authenticated
- 403: Authenticated but not authorized
- 404: Resource doesn't exist
- 500: We messed up

## Pagination

For lists, use cursor-based pagination:

```json
{
  "data": [...],
  "pagination": {
    "next_cursor": "eyJpZCI6MTAwfQ==",
    "has_more": true
  }
}
```

Offset pagination breaks with concurrent writes. Cursors don't.

## Rate Limiting

Always implement rate limiting. Return remaining quota in headers:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1699900800
```

## Idempotency

For mutations, support idempotency keys. Clients should be able to retry safely.

```
POST /v1/payments
Idempotency-Key: abc-123-def-456
```

## Conclusion

APIs are contracts. Design them carefully, document them thoroughly, and change them reluctantly.
