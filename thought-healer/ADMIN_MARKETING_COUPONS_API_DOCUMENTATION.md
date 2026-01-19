# Marketing Coupons Admin API Documentation

Complete API documentation for admin-only marketing coupon management and analytics.

## Table of Contents
- [Overview](#overview)
- [Authentication](#authentication)
- [CRUD APIs](#crud-apis)
- [Analytics APIs](#analytics-apis)
- [Request/Response Examples](#request-response-examples)
- [Error Handling](#error-handling)

---

## Overview

Marketing coupons are platform-level promotional codes managed by admins. Unlike psychologist coupons, these:
- ✅ Have **no owner** (platform-managed)
- ✅ Have **no commission** system
- ✅ Support **percentage** and **fixed amount** discounts
- ✅ Include **campaign tracking** and analytics
- ✅ Support **usage limits** (per user and total)
- ✅ Work with **web subscriptions** only

### Base URL
```
http://localhost:8080/api/admin
```

---

## Authentication

All endpoints require:
1. **JWT Token** in Authorization header
2. **Admin Role** (role-based access control)

```bash
Authorization: Bearer <jwt_token>
```

**Get Admin Token:**
```bash
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "your_password"}'
```

---

## CRUD APIs

### 1. Create Marketing Coupon

**Endpoint:** `POST /api/admin/marketing-coupons`

**Description:** Create a new marketing coupon for promotional campaigns.

**Request Body:**
```json
{
  "code": "WELCOME50",
  "name": "Welcome Offer",
  "description": "Get 50% off on your first subscription",
  "discountType": "percentage",
  "discountValue": 50,
  "maxDiscountAmount": 500,
  "applicableTo": ["premium", "ultra"],
  "minPurchaseAmount": 299,
  "maxTotalRedemptions": 1000,
  "maxPerUser": 1,
  "validFrom": "2026-01-01T00:00:00Z",
  "validUntil": "2026-12-31T23:59:59Z",
  "campaignName": "New Year 2026",
  "isActive": true
}
```

**Field Details:**

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `code` | string | ✅ Yes | Unique coupon code (uppercase) | `"WELCOME50"` |
| `name` | string | ✅ Yes | Display name | `"Welcome Offer"` |
| `description` | string | ❌ No | Detailed description | `"Get 50% off..."` |
| `discountType` | enum | ✅ Yes | `percentage` or `fixed` | `"percentage"` |
| `discountValue` | number | ✅ Yes | 1-100 for %, amount for fixed | `50` or `100` |
| `maxDiscountAmount` | number | ❌ No | Max discount cap (percentage only) | `500` |
| `applicableTo` | array | ✅ Yes | Plan types: `["premium", "ultra"]` | `["premium"]` |
| `minPurchaseAmount` | number | ❌ No | Minimum purchase required | `299` |
| `maxTotalRedemptions` | integer | ❌ No | Total usage limit (null = unlimited) | `1000` |
| `maxPerUser` | integer | ❌ No | Per-user limit (default: 1) | `1` |
| `validFrom` | datetime | ❌ No | Start date | `"2026-01-01T00:00:00Z"` |
| `validUntil` | datetime | ❌ No | Expiry date | `"2026-12-31T23:59:59Z"` |
| `campaignName` | string | ❌ No | Campaign identifier | `"New Year 2026"` |
| `isActive` | boolean | ❌ No | Active status (default: true) | `true` |

**Response (201):**
```json
{
  "success": true,
  "message": 201,
  "data": {
    "message": "Marketing coupon created successfully",
    "data": {
      "id": 1,
      "code": "WELCOME50",
      "name": "Welcome Offer",
      "discount_type": "percentage",
      "discount_value": 50,
      "max_discount_amount": 500,
      "applicable_to": ["premium", "ultra"],
      "is_active": true,
      "created_at": "2026-01-16T10:30:00Z",
      "total_redemptions": 0,
      "campaign_name": "New Year 2026"
    }
  }
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:8080/api/admin/marketing-coupons \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "NEWYEAR2026",
    "name": "New Year Special",
    "description": "30% off for new year celebrations",
    "discountType": "percentage",
    "discountValue": 30,
    "maxDiscountAmount": 300,
    "applicableTo": ["premium", "ultra"],
    "minPurchaseAmount": 500,
    "maxTotalRedemptions": 500,
    "maxPerUser": 1,
    "validUntil": "2026-02-28T23:59:59Z",
    "campaignName": "New Year 2026",
    "isActive": true
  }'
```

---

### 2. List All Marketing Coupons

**Endpoint:** `GET /api/admin/marketing-coupons`

**Description:** Get all marketing coupons with optional filtering.

**Query Parameters:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `isActive` | boolean | Filter by active status | `true` or `false` |
| `campaignName` | string | Filter by campaign | `"New Year 2026"` |
| `discountType` | string | Filter by type | `"percentage"` or `"fixed"` |

**Request:**
```bash
GET /api/admin/marketing-coupons?isActive=true&campaignName=New%20Year%202026
```

**Response (200):**
```json
{
  "success": true,
  "message": 200,
  "data": {
    "message": "Marketing coupons retrieved successfully",
    "data": [
      {
        "id": 1,
        "code": "WELCOME50",
        "name": "Welcome Offer",
        "discount_type": "percentage",
        "discount_value": 50,
        "max_discount_amount": 500,
        "applicable_to": ["premium", "ultra"],
        "min_purchase_amount": 299,
        "max_total_redemptions": 1000,
        "max_per_user": 1,
        "total_redemptions": 150,
        "is_active": true,
        "valid_from": "2026-01-01T00:00:00Z",
        "valid_until": "2026-12-31T23:59:59Z",
        "campaign_name": "New Year 2026",
        "created_at": "2026-01-01T00:00:00Z"
      },
      {
        "id": 2,
        "code": "FLAT100",
        "name": "Flat ₹100 Off",
        "discount_type": "fixed",
        "discount_value": 100,
        "applicable_to": ["premium"],
        "total_redemptions": 75,
        "is_active": true,
        "campaign_name": "New Year 2026"
      }
    ]
  }
}
```

**cURL Example:**
```bash
curl -X GET "http://localhost:8080/api/admin/marketing-coupons?isActive=true" \
  -H "Authorization: Bearer <admin_token>"
```

---

### 3. Get Coupon by ID

**Endpoint:** `GET /api/admin/marketing-coupons/:couponId`

**Description:** Get detailed information about a specific marketing coupon.

**Request:**
```bash
GET /api/admin/marketing-coupons/1
```

**Response (200):**
```json
{
  "success": true,
  "message": 200,
  "data": {
    "message": "Marketing coupon retrieved successfully",
    "data": {
      "id": 1,
      "code": "WELCOME50",
      "name": "Welcome Offer",
      "description": "Get 50% off on your first subscription",
      "discount_type": "percentage",
      "discount_value": 50,
      "max_discount_amount": 500,
      "applicable_to": ["premium", "ultra"],
      "min_purchase_amount": 299,
      "max_total_redemptions": 1000,
      "max_per_user": 1,
      "total_redemptions": 150,
      "is_active": true,
      "valid_from": "2026-01-01T00:00:00Z",
      "valid_until": "2026-12-31T23:59:59Z",
      "campaign_name": "New Year 2026",
      "created_by": 5,
      "created_at": "2026-01-01T00:00:00Z",
      "updated_at": "2026-01-15T12:00:00Z"
    }
  }
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:8080/api/admin/marketing-coupons/1 \
  -H "Authorization: Bearer <admin_token>"
```

---

### 4. Update Marketing Coupon

**Endpoint:** `PUT /api/admin/marketing-coupons/:couponId`

**Description:** Update an existing marketing coupon. All fields are optional.

**Request Body:**
```json
{
  "name": "Updated Welcome Offer",
  "discountValue": 60,
  "maxDiscountAmount": 600,
  "isActive": true,
  "validUntil": "2026-12-31T23:59:59Z"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": 200,
  "data": {
    "message": "Marketing coupon updated successfully",
    "data": {
      "id": 1,
      "code": "WELCOME50",
      "name": "Updated Welcome Offer",
      "discount_value": 60,
      "max_discount_amount": 600,
      "is_active": true,
      "updated_at": "2026-01-16T10:45:00Z"
    }
  }
}
```

**cURL Example:**
```bash
curl -X PUT http://localhost:8080/api/admin/marketing-coupons/1 \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "isActive": false,
    "validUntil": "2026-01-31T23:59:59Z"
  }'
```

---

### 5. Delete Marketing Coupon

**Endpoint:** `DELETE /api/admin/marketing-coupons/:couponId`

**Description:** Soft delete a marketing coupon (marks as inactive).

**Request:**
```bash
DELETE /api/admin/marketing-coupons/1
```

**Response (200):**
```json
{
  "success": true,
  "message": 200,
  "data": {
    "message": "Marketing coupon deleted successfully",
    "data": {
      "id": 1,
      "code": "WELCOME50",
      "is_active": false,
      "deleted_at": "2026-01-16T11:00:00Z"
    }
  }
}
```

**cURL Example:**
```bash
curl -X DELETE http://localhost:8080/api/admin/marketing-coupons/1 \
  -H "Authorization: Bearer <admin_token>"
```

---

### 6. Get Coupon Redemptions

**Endpoint:** `GET /api/admin/marketing-coupons/:couponId/redemptions`

**Description:** Get all redemption records for a specific coupon.

**Query Parameters:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `limit` | integer | Number of records (default: 50) | `100` |
| `offset` | integer | Skip records (pagination) | `0` |
| `startDate` | date | Filter from date | `2026-01-01` |
| `endDate` | date | Filter to date | `2026-01-31` |

**Request:**
```bash
GET /api/admin/marketing-coupons/1/redemptions?limit=10&offset=0
```

**Response (200):**
```json
{
  "success": true,
  "message": 200,
  "data": {
    "message": "Redemptions retrieved successfully",
    "data": {
      "coupon": {
        "id": 1,
        "code": "WELCOME50",
        "name": "Welcome Offer"
      },
      "total_redemptions": 150,
      "redemptions": [
        {
          "id": 1,
          "user_id": 188,
          "subscription_id": 94,
          "order_id": "order_S4QTEIa3OTHqGo",
          "original_amount": 2599,
          "discount_amount": 300,
          "final_amount": 2299,
          "plan_type": "ultra",
          "plan_duration": "yearly",
          "redeemed_at": "2026-01-15T14:30:00Z",
          "source": "web",
          "device_type": "desktop"
        }
      ],
      "pagination": {
        "limit": 10,
        "offset": 0,
        "total": 150
      }
    }
  }
}
```

**cURL Example:**
```bash
curl -X GET "http://localhost:8080/api/admin/marketing-coupons/1/redemptions?limit=20" \
  -H "Authorization: Bearer <admin_token>"
```

---

### 7. Get Coupons by Campaign

**Endpoint:** `GET /api/admin/marketing-coupons/campaigns/:campaignName`

**Description:** Get all coupons belonging to a specific campaign.

**Request:**
```bash
GET /api/admin/marketing-coupons/campaigns/New%20Year%202026
```

**Response (200):**
```json
{
  "success": true,
  "message": 200,
  "data": {
    "message": "Campaign coupons retrieved successfully",
    "data": {
      "campaign_name": "New Year 2026",
      "total_coupons": 3,
      "total_redemptions": 425,
      "total_revenue_impact": 125000,
      "coupons": [
        {
          "id": 1,
          "code": "WELCOME50",
          "discount_type": "percentage",
          "discount_value": 50,
          "total_redemptions": 150,
          "is_active": true
        },
        {
          "id": 2,
          "code": "FLAT100",
          "discount_type": "fixed",
          "discount_value": 100,
          "total_redemptions": 75,
          "is_active": true
        },
        {
          "id": 3,
          "code": "NEWYEAR2026",
          "discount_type": "percentage",
          "discount_value": 30,
          "total_redemptions": 200,
          "is_active": true
        }
      ]
    }
  }
}
```

**cURL Example:**
```bash
curl -X GET "http://localhost:8080/api/admin/marketing-coupons/campaigns/New%20Year%202026" \
  -H "Authorization: Bearer <admin_token>"
```

---

### 8. Validate Coupon Code

**Endpoint:** `POST /api/admin/marketing-coupons/validate/:code`

**Description:** Admin endpoint to validate a coupon code (testing/preview).

**Request Body:**
```json
{
  "userId": 188,
  "planType": "premium",
  "amount": 999
}
```

**Request:**
```bash
POST /api/admin/marketing-coupons/validate/WELCOME50
```

**Response (200):**
```json
{
  "success": true,
  "message": 200,
  "data": {
    "message": "Coupon validated successfully",
    "data": {
      "valid": true,
      "coupon": {
        "id": 1,
        "code": "WELCOME50",
        "discount_type": "percentage",
        "discount_value": 50
      },
      "discount_amount": 499.5,
      "final_amount": 499.5,
      "can_use": true,
      "reason": null
    }
  }
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:8080/api/admin/marketing-coupons/validate/WELCOME50 \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 188,
    "planType": "premium",
    "amount": 999
  }'
```

---

## Analytics APIs

### 1. Dashboard Analytics

**Endpoint:** `GET /api/admin/marketing-coupons/analytics/dashboard`

**Description:** Comprehensive dashboard with all key metrics and trends.

**Query Parameters:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `startDate` | date | Filter from date | `2026-01-01` |
| `endDate` | date | Filter to date | `2026-01-31` |
| `campaignName` | string | Filter by campaign | `"New Year 2026"` |

**Request:**
```bash
GET /api/admin/marketing-coupons/analytics/dashboard?startDate=2026-01-01&endDate=2026-01-31
```

**Response (200):**
```json
{
  "success": true,
  "message": 200,
  "data": {
    "message": "Dashboard analytics retrieved successfully",
    "data": {
      "summary": {
        "total_coupons": 15,
        "active_coupons": 12,
        "total_redemptions": 1250,
        "unique_users": 980,
        "total_discount_given": 450000,
        "total_revenue": 1850000,
        "average_discount_per_order": 360,
        "conversion_rate": 12.5
      },
      "top_performing_coupons": [
        {
          "code": "WELCOME50",
          "redemptions": 350,
          "revenue": 520000,
          "avg_discount": 450
        },
        {
          "code": "NEWYEAR2026",
          "redemptions": 280,
          "revenue": 640000,
          "avg_discount": 280
        }
      ],
      "trends": {
        "daily_redemptions": [
          {"date": "2026-01-01", "count": 45},
          {"date": "2026-01-02", "count": 52}
        ],
        "revenue_trend": [
          {"date": "2026-01-01", "amount": 65000},
          {"date": "2026-01-02", "amount": 78000}
        ]
      },
      "plan_distribution": {
        "premium": 620,
        "ultra": 630
      },
      "discount_type_breakdown": {
        "percentage": 850,
        "fixed": 400
      }
    }
  }
}
```

**cURL Example:**
```bash
curl -X GET "http://localhost:8080/api/admin/marketing-coupons/analytics/dashboard?startDate=2026-01-01&endDate=2026-01-31" \
  -H "Authorization: Bearer <admin_token>"
```

---

### 2. Coupon Detailed Analytics

**Endpoint:** `GET /api/admin/marketing-coupons/analytics/coupon/:couponId`

**Description:** In-depth analytics for a specific coupon including trends and demographics.

**Request:**
```bash
GET /api/admin/marketing-coupons/analytics/coupon/1
```

**Response (200):**
```json
{
  "success": true,
  "message": 200,
  "data": {
    "message": "Coupon analytics retrieved successfully",
    "data": {
      "coupon": {
        "id": 1,
        "code": "WELCOME50",
        "name": "Welcome Offer",
        "campaign_name": "New Year 2026"
      },
      "performance": {
        "total_redemptions": 350,
        "unique_users": 340,
        "repeat_users": 10,
        "total_revenue": 520000,
        "total_discount_given": 157500,
        "average_order_value": 1485,
        "average_discount": 450,
        "conversion_rate": 15.2
      },
      "trends": {
        "redemptions_over_time": [
          {"date": "2026-01-01", "count": 15},
          {"date": "2026-01-02", "count": 22}
        ],
        "revenue_over_time": [
          {"date": "2026-01-01", "amount": 22500},
          {"date": "2026-01-02", "amount": 32700}
        ]
      },
      "demographics": {
        "plan_breakdown": {
          "premium": 180,
          "ultra": 170
        },
        "duration_breakdown": {
          "monthly": 50,
          "yearly": 300
        },
        "source_breakdown": {
          "web": 350,
          "mobile": 0
        },
        "device_breakdown": {
          "desktop": 220,
          "mobile": 100,
          "tablet": 30
        }
      },
      "top_users": [
        {
          "user_id": 188,
          "redemptions": 1,
          "total_spent": 1485,
          "discount_received": 450
        }
      ]
    }
  }
}
```

**cURL Example:**
```bash
curl -X GET http://localhost:8080/api/admin/marketing-coupons/analytics/coupon/1 \
  -H "Authorization: Bearer <admin_token>"
```

---

### 3. Campaign Comparison

**Endpoint:** `POST /api/admin/marketing-coupons/analytics/campaigns/compare`

**Description:** Compare performance metrics across multiple campaigns.

**Request Body:**
```json
{
  "campaigns": ["New Year 2026", "Summer Sale 2026", "Black Friday 2026"],
  "startDate": "2026-01-01",
  "endDate": "2026-12-31"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": 200,
  "data": {
    "message": "Campaign comparison retrieved successfully",
    "data": {
      "campaigns": [
        {
          "campaign_name": "New Year 2026",
          "total_coupons": 5,
          "total_redemptions": 850,
          "unique_users": 720,
          "total_revenue": 1250000,
          "total_discount": 280000,
          "average_discount": 329,
          "conversion_rate": 14.5,
          "roi": 4.46
        },
        {
          "campaign_name": "Summer Sale 2026",
          "total_coupons": 3,
          "total_redemptions": 620,
          "unique_users": 580,
          "total_revenue": 980000,
          "total_discount": 195000,
          "average_discount": 314,
          "conversion_rate": 12.8,
          "roi": 5.02
        }
      ],
      "best_performing": {
        "by_revenue": "New Year 2026",
        "by_redemptions": "New Year 2026",
        "by_roi": "Summer Sale 2026",
        "by_conversion": "New Year 2026"
      }
    }
  }
}
```

**cURL Example:**
```bash
curl -X POST http://localhost:8080/api/admin/marketing-coupons/analytics/campaigns/compare \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "campaigns": ["New Year 2026", "Summer Sale 2026"],
    "startDate": "2026-01-01",
    "endDate": "2026-12-31"
  }'
```

---

### 4. ROI Analysis

**Endpoint:** `GET /api/admin/marketing-coupons/analytics/roi`

**Description:** Return on Investment analysis for marketing coupons.

**Query Parameters:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `startDate` | date | Filter from date | `2026-01-01` |
| `endDate` | date | Filter to date | `2026-01-31` |
| `campaignName` | string | Filter by campaign | `"New Year 2026"` |
| `couponId` | integer | Filter by specific coupon | `1` |

**Request:**
```bash
GET /api/admin/marketing-coupons/analytics/roi?campaignName=New%20Year%202026
```

**Response (200):**
```json
{
  "success": true,
  "message": 200,
  "data": {
    "message": "ROI analysis retrieved successfully",
    "data": {
      "overall": {
        "total_revenue": 1850000,
        "total_discount_given": 450000,
        "total_orders": 1250,
        "average_order_value": 1480,
        "roi": 4.11,
        "cost_per_acquisition": 360
      },
      "by_campaign": [
        {
          "campaign_name": "New Year 2026",
          "revenue": 1250000,
          "discount": 280000,
          "orders": 850,
          "roi": 4.46,
          "cpa": 329
        }
      ],
      "by_discount_type": {
        "percentage": {
          "revenue": 1200000,
          "discount": 320000,
          "roi": 3.75
        },
        "fixed": {
          "revenue": 650000,
          "discount": 130000,
          "roi": 5.0
        }
      },
      "by_plan_type": {
        "premium": {
          "revenue": 850000,
          "discount": 220000,
          "orders": 620,
          "roi": 3.86
        },
        "ultra": {
          "revenue": 1000000,
          "discount": 230000,
          "orders": 630,
          "roi": 4.35
        }
      }
    }
  }
}
```

**cURL Example:**
```bash
curl -X GET "http://localhost:8080/api/admin/marketing-coupons/analytics/roi?startDate=2026-01-01&endDate=2026-01-31" \
  -H "Authorization: Bearer <admin_token>"
```

---

### 5. Acquisition Funnel

**Endpoint:** `GET /api/admin/marketing-coupons/analytics/funnel`

**Description:** User acquisition funnel metrics for coupon campaigns.

**Query Parameters:**

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `startDate` | date | Filter from date | `2026-01-01` |
| `endDate` | date | Filter to date | `2026-01-31` |
| `campaignName` | string | Filter by campaign | `"New Year 2026"` |

**Request:**
```bash
GET /api/admin/marketing-coupons/analytics/funnel?campaignName=New%20Year%202026
```

**Response (200):**
```json
{
  "success": true,
  "message": 200,
  "data": {
    "message": "Funnel metrics retrieved successfully",
    "data": {
      "funnel": {
        "coupon_views": 8500,
        "validation_attempts": 5200,
        "successful_validations": 4850,
        "order_creations": 3200,
        "completed_payments": 1250,
        "conversion_rates": {
          "view_to_validation": 61.2,
          "validation_to_order": 65.9,
          "order_to_payment": 39.1,
          "overall": 14.7
        }
      },
      "drop_off_analysis": {
        "validation_failures": 350,
        "abandoned_orders": 1950,
        "payment_failures": 0
      },
      "time_to_conversion": {
        "average_minutes": 45,
        "median_minutes": 32,
        "within_1_hour": 850,
        "within_24_hours": 320,
        "after_24_hours": 80
      }
    }
  }
}
```

**cURL Example:**
```bash
curl -X GET "http://localhost:8080/api/admin/marketing-coupons/analytics/funnel?startDate=2026-01-01" \
  -H "Authorization: Bearer <admin_token>"
```

---

## Request/Response Examples

### Complete Workflow Example

#### Step 1: Create Campaign Coupons
```bash
# Create percentage discount coupon
curl -X POST http://localhost:8080/api/admin/marketing-coupons \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "WELCOME50",
    "name": "Welcome Offer",
    "description": "50% off on first subscription",
    "discountType": "percentage",
    "discountValue": 50,
    "maxDiscountAmount": 500,
    "applicableTo": ["premium", "ultra"],
    "minPurchaseAmount": 299,
    "maxTotalRedemptions": 1000,
    "maxPerUser": 1,
    "validUntil": "2026-12-31T23:59:59Z",
    "campaignName": "New Year 2026",
    "isActive": true
  }'

# Create fixed discount coupon
curl -X POST http://localhost:8080/api/admin/marketing-coupons \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "FLAT100",
    "name": "Flat ₹100 Off",
    "description": "Get flat ₹100 discount",
    "discountType": "fixed",
    "discountValue": 100,
    "applicableTo": ["premium"],
    "maxPerUser": 1,
    "campaignName": "New Year 2026",
    "isActive": true
  }'
```

#### Step 2: Monitor Campaign Performance
```bash
# Get dashboard analytics
curl -X GET "http://localhost:8080/api/admin/marketing-coupons/analytics/dashboard?campaignName=New%20Year%202026" \
  -H "Authorization: Bearer <admin_token>"

# Get specific coupon analytics
curl -X GET http://localhost:8080/api/admin/marketing-coupons/analytics/coupon/1 \
  -H "Authorization: Bearer <admin_token>"
```

#### Step 3: Check ROI
```bash
curl -X GET "http://localhost:8080/api/admin/marketing-coupons/analytics/roi?campaignName=New%20Year%202026" \
  -H "Authorization: Bearer <admin_token>"
```

#### Step 4: Compare with Other Campaigns
```bash
curl -X POST http://localhost:8080/api/admin/marketing-coupons/analytics/campaigns/compare \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "campaigns": ["New Year 2026", "Summer Sale 2026"],
    "startDate": "2026-01-01",
    "endDate": "2026-12-31"
  }'
```

#### Step 5: Update Coupon if Needed
```bash
curl -X PUT http://localhost:8080/api/admin/marketing-coupons/1 \
  -H "Authorization: Bearer <admin_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "maxTotalRedemptions": 2000,
    "validUntil": "2026-06-30T23:59:59Z"
  }'
```

---

## Error Handling

### Common Error Responses

#### 400 - Validation Error
```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "code": "Code is required",
    "discountValue": "Discount value must be between 1 and 100 for percentage type"
  }
}
```

#### 401 - Unauthorized
```json
{
  "success": false,
  "error": "Invalid authentication token",
  "code": "invalid_token"
}
```

#### 403 - Forbidden (Not Admin)
```json
{
  "success": false,
  "error": "Access denied. Admin role required.",
  "code": "forbidden"
}
```

#### 404 - Not Found
```json
{
  "success": false,
  "error": "Marketing coupon not found",
  "code": "not_found"
}
```

#### 409 - Conflict (Duplicate Code)
```json
{
  "success": false,
  "error": "Coupon code already exists",
  "code": "duplicate_code"
}
```

#### 500 - Server Error
```json
{
  "success": false,
  "error": "Internal server error",
  "code": "server_error"
}
```

---

## API Summary Table

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/marketing-coupons` | POST | Create coupon | Admin |
| `/marketing-coupons` | GET | List all coupons | Admin |
| `/marketing-coupons/:id` | GET | Get coupon details | Admin |
| `/marketing-coupons/:id` | PUT | Update coupon | Admin |
| `/marketing-coupons/:id` | DELETE | Delete coupon | Admin |
| `/marketing-coupons/:id/redemptions` | GET | Get redemptions | Admin |
| `/marketing-coupons/campaigns/:name` | GET | Get campaign coupons | Admin |
| `/marketing-coupons/validate/:code` | POST | Validate coupon | Admin |
| `/analytics/dashboard` | GET | Dashboard analytics | Admin |
| `/analytics/coupon/:id` | GET | Coupon analytics | Admin |
| `/analytics/campaigns/compare` | POST | Compare campaigns | Admin |
| `/analytics/roi` | GET | ROI analysis | Admin |
| `/analytics/funnel` | GET | Acquisition funnel | Admin |

---

## Best Practices

1. **Coupon Code Naming:**
   - Use uppercase letters
   - Make it memorable (e.g., WELCOME50, NEWYEAR2026)
   - Include campaign identifier

2. **Discount Strategy:**
   - Set `maxDiscountAmount` for percentage coupons to control costs
   - Use `minPurchaseAmount` to ensure profitability
   - Limit `maxPerUser` to prevent abuse

3. **Campaign Management:**
   - Group related coupons under same `campaignName`
   - Set clear `validFrom` and `validUntil` dates
   - Monitor analytics regularly

4. **Analytics Monitoring:**
   - Check ROI weekly
   - Compare campaigns monthly
   - Analyze funnel drop-offs to optimize

5. **Security:**
   - Never expose admin endpoints publicly
   - Rotate admin tokens regularly
   - Monitor for unusual redemption patterns

---

**Last Updated:** January 16, 2026  
**API Version:** 1.0  
**Base URL:** http://localhost:8080/api/admin
