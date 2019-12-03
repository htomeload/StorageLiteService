import { Injectable } from '@angular/core';

const acceptDataType = {
	'string': true,
	'number': true,
	'boolean': true,
	'bigint': true,
	'object': true,
	'function': false,
	'symbol': false,
	'undefined': false
};

@Injectable({
	providedIn: 'root'
})
export class StorageLiteService {

	constructor() { }

	_retriveKeys() {
		try {
			let key_ = [];

			for(let key of Object.keys(localStorage)) {
				key_.push(key);
			}

			return key_;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	_retriveData(key: string) {
		try {
			let item_ = localStorage.getItem(key);

			if (item_) {
				if ((item_.substr(0, 1) == "{" && item_.substr(item_.length-1, 1) == "}") || (item_.substr(0, 1) == "[" && item_.substr(item_.length-1, 1) == "]")){
					return JSON.parse(item_);
				}else if ((/^\d+?$/.test(item_))){
					return parseInt(item_);
				}else if ((/^\d+(\.\d+)?$/.test(item_))){
                    return parseFloat(item_);
                }else if (["true", "false"].indexOf(item_) != -1){
					if (item_ == "true") {
                        return true;
                    }else{
                        return false;
                    }
				}else{
                    return item_;
                }
			}else{
				return false;
			}
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	_storeData(key: string, value: any) {
		try {
			if (acceptDataType[ typeof value ]){
				let v_: any = "";

				if (value instanceof Array || value instanceof Object){
					v_ = JSON.stringify(value);
				}else if ((Number.isInteger(value) || Number.isFinite(value)) && !Number.isNaN(value)){
					v_ = value.toString();
				}else if (value instanceof Boolean){
                    v_ = value.toString();
                }else{
					v_ = value;
				}

				localStorage.setItem(key, v_);
				return true;
			}else{
				let name_ = Object.keys(value);
				console.error("StorageLiteService: _storeData(); type of value "+name_[0]+"("+(typeof value)+") is not valid type.");
				return false;
			}
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	_removeData(key: string) {
		try {
			localStorage.removeItem(key);
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	_truncateData() {
		try {
			localStorage.clear();
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}
}
