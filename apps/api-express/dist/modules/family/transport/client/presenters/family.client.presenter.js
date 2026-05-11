"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presentFamilyMember = presentFamilyMember;
function presentFamilyMember(member) {
    return {
        id: member.user.id,
        name: member.user.firstName,
        sex: member.user.sex,
        avatarUrl: member.user.avatarUrl,
    };
}
