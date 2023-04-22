/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 835:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class IBits {
}
class Bits extends IBits {
    constructor() { super(); }
    static getInstance() {
        if (!Bits.Instance) {
            Bits.Instance = new Bits();
        }
        return Bits.Instance;
    }
    //获取bit
    getBits(n, id = 0, ans = "") {
        switch (true) {
            case id === 32:
                return ans;
            default:
                //获取当前最低位使用n&1即可，每次递归都会将n无符号右移一位
                return this.getBits(n >>> 1, ++id, `${n & 1}${ans}`);
        }
    }
    //反转BIT
    reverseBit(num, id = 0, ans = 0) {
        switch (true) {
            case id === 32:
                return ans;
            case (num & 1) === 0:
                //当前最低位为0时，递归但不改变结果。无符号右移
                return this.reverseBit(num >>> 1, ++id, ans);
            default:
                //当前最低位为1时，修改结果，反转id则为(31 - id)
                return this.reverseBit(num >>> 1, id + 1, ans | 1 << 31 - id);
        }
    }
    //number转16进制
    toHex(num, id = 0, ans = "x0") {
        const list = "ABCDEF";
        switch (true) {
            case id === 32:
                //字符串转为数组
                const res = ans.split("");
                //交换相邻两个字符，16进制字符串是4位转换为一个字符，原字符串刚好是每两位相反
                for (let i = 0; i < ans.length; i++)
                    (i & 1) && ([res[i], res[i ^ 1]] = [res[i ^ 1], res[i]]);
                return res.join("");
            default:
                return this.toHex(num >>> 4, id + 4, `${ans}${(num & 0B1111) <= 9 ? (num & 0B1111) : list[(num & 0B1111) - 10]}`);
        }
    }
    //将一个位等于0反转为1后，所得到的最长位为1的字符串长度
    getReverseMax(num, before, after, max) {
        switch (true) {
            case max === 32:
                return max;
            case num === 0:
                //before === after 说明没有修改0为1，结果增加1
                return before === after ? max + 1 : max;
            case (num & 1) === 0:
                //碰到为0的位，重置before为0，after也重置为before+1
                return this.getReverseMax(num >>> 1, 0, before + 1, Math.max(max, before + 1));
            default:
                //碰到为1的位，before、after指针各+1
                return this.getReverseMax(num >>> 1, ++before, ++after, Math.max(max, after));
        }
    }
    *[Symbol.iterator]() {
        yield* Object.getOwnPropertyNames(Bits.prototype).filter(row => row !== "constructor");
    }
}
/*
    ;( async function(){
        const bits = Bits.getInstance()
        for( const row of bits )console.log( row )
    } )()
*/
exports["default"] = Bits;


/***/ }),

/***/ 260:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
class IPrime {
}
class Prime extends IPrime {
    constructor() {
        super();
    }
    static getInstance() {
        if (!Prime.Instance) {
            Prime.Instance = new Prime();
        }
        return Prime.Instance;
    }
    getPrime() {
        return new TransformStream({
            transform(chunk, controller) {
                return __awaiter(this, void 0, void 0, function* () {
                    const param = JSON.parse(Buffer.from(chunk).toString());
                    if (!param.num)
                        throw new Error("缺少必要参数num,且参数必须位正整数");
                    const LENGTH = param.num;
                    const vist = new Int8Array(LENGTH);
                    const ans = new Array();
                    const dfs = function (id) {
                        switch (true) {
                            case id === LENGTH:
                                return true;
                            case id <= 1:
                                vist[id] = 0;
                                return true;
                            default:
                                ans.push(id);
                                for (let p = id; p * id < LENGTH; ++p)
                                    vist[p * id] || (vist[p * id] ^= 1);
                                return true;
                        }
                    };
                    for (let i = 0; i < LENGTH; i++)
                        vist[i] || dfs(i);
                    return controller.enqueue(Buffer.from(JSON.stringify(ans)));
                });
            }
        });
    }
    getAuth() {
        //@ts-ignore
        console.log(JSON.parse(Buffer.from("WyJcbiIsIlxuIiwiICAgICAgICAgICAgICAgICAgIF9fXz09PT0tXyAgXy09PT09X19fXG4iLCIgICAgICAgICAgICAgXy0tXl5eIyMjIyMvLyAgICAgIFxcXFwjIyMjI15eXi0tX1xuIiwiICAgICAgICAgIF8tXiMjIyMjIyMjIyMvLyAoICAgICkgXFxcXCMjIyMjIyMjIyNeLV9cbiIsIiAgICAgICAgIC0jIyMjIyMjIyMjIyMvLyAgfFxcXl4vfCAgXFxcXCMjIyMjIyMjIyMjIy1cbiIsIiAgICAgICBfLyMjIyMjIyMjIyMjIy8vICAgKEA6OkApICAgXFxcXCMjIyMjIyMjIyMjI1xcX1xuIiwiICAgICAgLyMjIyMjIyMjIyMjIyMoKCAgICAgXFxcXC8vICAgICApKSMjIyMjIyMjIyMjIyNcXFxuIiwiICAgICAtIyMjIyMjIyMjIyMjIyMjXFxcXCAgICAob28pICAgIC8vIyMjIyMjIyMjIyMjIyMjLVxuIiwiICAgIC0jIyMjIyMjIyMjIyMjIyMjI1xcXFwgIC8gVlYgXFwgIC8vIyMjIyMjIyMjIyMjIyMjIyMtXG4iLCIgICAtIyMjIyMjIyMjIyMjIyMjIyMjI1xcXFwvICAgICAgXFwvLyMjIyMjIyMjIyMjIyMjIyMjIyMtXG4iLCIgIF8jL3wjIyMjIyMjIyMjL1xcIyMjIyMjKCAgIC9cXCAgICkjIyMjIyMvXFwjIyMjIyMjIyMjfFxcI19cbiIsIiAgfC8gfCMvXFwjL1xcIy9cXC8gIFxcIy9cXCMjXFwgIHwgIHwgIC8jIy9cXCMvICBcXC9cXCMvXFwjL1xcI3wgXFx8XG4iLCIgIGAgIHwvICBWICBWICBgICAgViAgXFwjXFx8IHwgIHwgfC8jLyAgViAgICcgIFYgIFYgIFxcfCAgJ1xuIiwiICAgICBgICAgYCAgYCAgICAgIGAgICAvIHwgfCAgfCB8IFxcICAgJyAgICAgICcgICcgICAnXG4iLCIgICAgICAgICAgICAgICAgICAgICAgKCAgfCB8ICB8IHwgIClcbiIsIiAgICAgICAgICAgICAgICAgICAgIF9fXFwgfCB8ICB8IHwgL19fXG4iLCIgICAgICAgICAgICAgICAgICAgICh2dnYoVlZWKShWVlYpdnZ2KVxuIiwiXG4iLCIgICAgICB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XG4iLCJcbiIsIiAgICAgIEF1dGhvciAgICAgICA6IGNoZW5zaGVuZ2RhXG4iLCIgICAgICBFbWFpbCAgICAgICAgOiBzaGVuZ2RhY2hlbjE5OTFAZ21haWwuY29tXG4iLCIgICAgICBEYXRlICAgICAgICAgOiAyMDIzLTAzLTEzIDIxOjE4OjA4XG4iLCIgICAgICBHaXRIdWIgICAgICAgOiBodHRwczovL2dpdGh1Yi5jb20vY2hlbnNoZW5nZGEwL2NhcmRzLmdpdFxuIiwiICAgICAgTGVldENvZGUgICAgIDogaHR0cHM6Ly9sZWV0Y29kZS5jbi91L2NoZW5zaGVuZ2RhL1xuIiwiXG4iXQ==", "base64").toString("utf8")).join(""));
    }
    *[Symbol.iterator]() {
        yield* Object.getOwnPropertyNames(Prime.prototype).filter(row => row !== "constructor");
    }
}
/*
    ;(async()=>{
        const prime = Prime.getInstance()
        prime.getAuth()
    })();
*/
exports["default"] = Prime;


/***/ }),

/***/ 895:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Bits = exports.Prime = void 0;
const Prime_1 = __importDefault(__webpack_require__(260));
exports.Prime = Prime_1.default;
const Bits_1 = __importDefault(__webpack_require__(835));
exports.Bits = Bits_1.default;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
__webpack_unused_export__ = __webpack_unused_export__ = void 0;
const tools_1 = __webpack_require__(895);
//挨筛法求质数
const prime = tools_1.Prime.getInstance();
__webpack_unused_export__ = prime;
//获取比特位
const bits = tools_1.Bits.getInstance();
__webpack_unused_export__ = bits;

})();

/******/ })()
;
//# sourceMappingURL=index.js.map