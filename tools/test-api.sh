#!/bin/bash

# SystemQuest API 测试脚本
# 用于测试所有已实现的 API 端点

echo "🧪 SystemQuest API 完整测试"
echo "=============================="
echo ""

# 配置
API_BASE="${API_BASE:-http://localhost:3000}"
ACCESS_TOKEN="${1:-}"

if [ -z "$ACCESS_TOKEN" ]; then
    echo "❌ 错误：请提供 Access Token"
    echo ""
    echo "使用方法："
    echo "  ./test-api.sh YOUR_ACCESS_TOKEN"
    echo ""
    echo "💡 提示：从 OAuth 测试工具获取 Access Token"
    exit 1
fi

echo "🔑 Access Token: ${ACCESS_TOKEN:0:50}..."
echo ""

# 测试函数
test_api() {
    local method=$1
    local endpoint=$2
    local description=$3
    local needs_auth=$4
    
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📡 测试: $description"
    echo "   方法: $method"
    echo "   端点: $endpoint"
    
    if [ "$needs_auth" = "true" ]; then
        echo "   认证: 需要 🔒"
        http_code=$(curl -s -o /tmp/api_response.json -w "%{http_code}" \
            -H "Authorization: Bearer $ACCESS_TOKEN" \
            -H "Content-Type: application/json" \
            "$API_BASE$endpoint")
        body=$(cat /tmp/api_response.json 2>/dev/null)
    else
        echo "   认证: 不需要"
        http_code=$(curl -s -o /tmp/api_response.json -w "%{http_code}" \
            -H "Content-Type: application/json" \
            "$API_BASE$endpoint")
        body=$(cat /tmp/api_response.json 2>/dev/null)
    fi
    
    if [ "$http_code" -ge 200 ] && [ "$http_code" -lt 300 ]; then
        echo "   状态: ✅ $http_code"
        echo "   响应:"
        echo "$body" | jq '.' 2>/dev/null || echo "$body"
    else
        echo "   状态: ❌ $http_code"
        echo "   错误:"
        echo "$body" | jq '.' 2>/dev/null || echo "$body"
    fi
    echo ""
}

# 开始测试
echo "🚀 开始测试所有 API 端点..."
echo ""

# 1. 认证相关 API
echo "═══════════════════════════════════════════"
echo "🔐 认证相关 API"
echo "═══════════════════════════════════════════"
echo ""

test_api "GET" "/v1/auth/me" "获取当前用户信息" "true"

# 2. 课程相关 API
echo "═══════════════════════════════════════════"
echo "📚 课程相关 API"
echo "═══════════════════════════════════════════"
echo ""

test_api "GET" "/v1/courses" "获取课程列表" "false"
test_api "GET" "/v1/courses?include=stages,languages" "获取课程列表（包含关联数据）" "false"
test_api "GET" "/v1/courses/websocket-server" "获取 WebSocket Server 课程详情" "false"
test_api "GET" "/v1/courses/consistent-hash" "获取 Consistent Hashing 课程详情" "false"
test_api "GET" "/v1/courses/bloom-filter" "获取 Bloom Filter 课程详情" "false"
test_api "GET" "/v1/courses/load-balancer" "获取 Load Balancer 课程详情" "false"

# 3. 语言相关 API
echo "═══════════════════════════════════════════"
echo "💻 语言相关 API"
echo "═══════════════════════════════════════════"
echo ""

test_api "GET" "/v1/languages" "获取语言列表" "false"

# 测试完成
echo "═══════════════════════════════════════════"
echo "✅ 测试完成！"
echo "═══════════════════════════════════════════"
echo ""
echo "📊 测试总结："
echo "   - 认证 API: 1 个端点"
echo "   - 课程 API: 6 个端点"
echo "   - 语言 API: 1 个端点"
echo "   - 总计: 8 个端点"
echo ""
echo "💡 提示："
echo "   - 使用 React OAuth 测试工具获取 Access Token"
echo "   - React 工具位置: tools/oauth-test-react"
echo "   - 启动方式: cd tools/oauth-test-react && pnpm dev"
echo ""
