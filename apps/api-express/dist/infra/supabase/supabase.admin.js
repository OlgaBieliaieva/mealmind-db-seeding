"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupabaseAdmin = getSupabaseAdmin;
const supabase_js_1 = require("@supabase/supabase-js");
function getSupabaseAdmin() {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
        throw new Error("Missing Supabase admin env");
    }
    return (0, supabase_js_1.createClient)(url, key);
}
