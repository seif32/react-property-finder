# 📚 Bookmark API Documentation

Base URL: `/api/bookmarks`

---

## 📥 GET `/api/bookmarks`

Retrieve all bookmarks.

- **Request Body:** _None_
- **Response:**

  ```json
  [
    {
      "id": 1,
      "userId": 2,
      "propertyId": 5,
      "property": {
        "id": 5,
        "title": "Luxury Apartment",
        "description": "Nice place",
        "price": 500000,
        "location": "Downtown",
        "bedrooms": 2,
        "bathrooms": 2,
        "area": 120,
        "propertyType": "Apartment",
        "listingType": "Sale",
        "ownerId": 7,
        "ownerName": "John Doe"
      },
      "createdAt": "2024-05-13T12:00:00"
    }
  ]
  ```

---

## 📥 GET `/api/bookmarks/{id}`

Retrieve a bookmark by its ID.

- **Path Parameter:** `id` (Long) – Bookmark ID
- **Request Body:** _None_
- **Response:** Same structure as above (a single object)
- **404:** If not found

---

## 📥 GET `/api/bookmarks/user/{userId}`

Retrieve all bookmarks by a specific user.

- **Path Parameter:** `userId` (Long)
- **Response:** List of `BookmarkDTO`

---

## 📥 GET `/api/bookmarks/property/{propertyId}`

Retrieve all bookmarks for a specific property.

- **Path Parameter:** `propertyId` (Long)
- **Response:** List of `BookmarkDTO`

---

## 📥 GET `/api/bookmarks/check/{userId}/{propertyId}`

Check if a property is bookmarked by a user.

- **Path Parameters:**

  - `userId` (Long)
  - `propertyId` (Long)

- **Response:**

  ```json
  true
  ```

---

## ➕ POST `/api/bookmarks`

Create a new bookmark.

- **Request Body:**

  ```json
  {
    "userId": 2,
    "propertyId": 5
  }
  ```

- **Response (201 Created):**

  ```json
  {
    "id": 1,
    "userId": 2,
    "propertyId": 5,
    "property": { ... },
    "createdAt": "2024-05-13T12:00:00"
  }
  ```

- **409 Conflict:** If bookmark already exists or data is invalid

---

## ❌ DELETE `/api/bookmarks/{id}`

Delete a bookmark by ID.

- **Path Parameter:** `id` (Long)
- **Response:** `204 No Content` on success
- **404:** If not found

---

## ❌ DELETE `/api/bookmarks/user/{userId}/property/{propertyId}`

Delete a bookmark by user and property combination.

- **Path Parameters:**

  - `userId` (Long)
  - `propertyId` (Long)

- **Response:** `204 No Content` on success
- **404:** If not found
