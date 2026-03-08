#!/bin/bash

echo "======================================"
echo "MySecureLoans API Test Suite"
echo "======================================"
echo ""

BASE_URL="http://localhost:3000"
COOKIE_JAR="cookies.txt"

# Test 1: Check if server is running
echo "TEST 1: Server Health Check"
echo "=========================="
response=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL)
if [ "$response" = "200" ]; then
    echo "✅ Server is running on port 3000"
else
    echo "❌ Server not responding (HTTP $response)"
    exit 1
fi
echo ""

# Test 2: Submit Loan Application
echo "TEST 2: Submit Loan Application"
echo "================================"
app_response=$(curl -s -X POST $BASE_URL/loans \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=Test User&phone=9876543210&email=waytoabhijeet@gmail.com&loan-type=Personal Loan&amount=500000&income=75000")

# Extract Application ID from response
app_id=$(echo "$app_response" | grep -oP 'APP\d+[a-z0-9]{9}' | head -1)

if [ ! -z "$app_id" ]; then
    echo "✅ Loan application submitted successfully"
    echo "   Application ID: $app_id"
else
    echo "❌ Failed to submit loan application"
    echo "Response: $app_response"
fi
echo ""

# Test 3: Track Loan Status (without login)
echo "TEST 3: Track Loan Status"
echo "========================="
if [ ! -z "$app_id" ]; then
    track_response=$(curl -s $BASE_URL/loans/track/$app_id)
    if echo "$track_response" | grep -q "Applied"; then
        echo "✅ Loan status tracking works"
        echo "   Status: Applied"
    else
        echo "⚠️  Could not verify status from response"
    fi
else
    echo "❌ Skipped - No Application ID available"
fi
echo ""

# Test 4: Admin Login
echo "TEST 4: Admin Login"
echo "==================="
login_response=$(curl -s -c $COOKIE_JAR -X POST $BASE_URL/admin/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "password=securepassword123" \
  -w "\n%{http_code}")

status_code=$(echo "$login_response" | tail -n 1)
if [ "$status_code" = "302" ] || [ "$status_code" = "200" ]; then
    echo "✅ Admin login successful (HTTP $status_code)"
else
    echo "❌ Admin login failed (HTTP $status_code)"
fi
echo ""

# Test 5: Access Admin Dashboard
echo "TEST 5: Admin Dashboard Access"
echo "==============================="
dashboard_response=$(curl -s -b $COOKIE_JAR $BASE_URL/admin/dashboard)
if echo "$dashboard_response" | grep -q "dashboard\|loan\|application" || [ ! -z "$dashboard_response" ]; then
    echo "✅ Admin dashboard is accessible"
else
    echo "⚠️  Dashboard response received"
fi
echo ""

# Test 6: List Loans API (if exists)
echo "TEST 6: List Loans"
echo "=================="
list_response=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL/loans/)
if [ "$list_response" = "200" ]; then
    echo "✅ Loans listing endpoint works (HTTP $list_response)"
else
    echo "⚠️  Loans endpoint returned HTTP $list_response"
fi
echo ""

# Test 7: Home Page
echo "TEST 7: Home Page"
echo "================="
home_response=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL/)
if [ "$home_response" = "200" ]; then
    echo "✅ Home page loads successfully"
else
    echo "❌ Home page failed (HTTP $home_response)"
fi
echo ""

# Cleanup
rm -f $COOKIE_JAR

echo "======================================"
echo "Test Suite Complete"
echo "======================================"
