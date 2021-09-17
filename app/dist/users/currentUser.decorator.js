"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const authorizeAndReturnId = (authorization) => {
    const token = authorization.substring(7);
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken.user_id;
    }
    catch (e) {
        throw new common_1.UnauthorizedException(e.message);
    }
};
exports.CurrentUser = (0, common_1.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    const user_id = authorizeAndReturnId(request.headers['authorization']);
    return +user_id;
});
//# sourceMappingURL=currentUser.decorator.js.map