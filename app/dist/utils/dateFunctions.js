"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentMonth = exports.endOfWeek = exports.startOfWeek = exports.now = void 0;
exports.now = new Date();
const startOfWeek = () => new Date(exports.now.getFullYear(), exports.now.getMonth(), exports.now.getDate() - exports.now.getDay() + 1);
exports.startOfWeek = startOfWeek;
const endOfWeek = () => new Date(exports.now.getFullYear(), exports.now.getMonth(), (0, exports.startOfWeek)().getDate() + 7);
exports.endOfWeek = endOfWeek;
exports.currentMonth = exports.now.getMonth() + 1;
//# sourceMappingURL=dateFunctions.js.map