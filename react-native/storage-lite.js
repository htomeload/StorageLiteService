import { AsyncStorage } from 'react-native'

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

export const StorageLite =  {

	async _retriveKeys() {
		try {
			let key_ = await AsyncStorage.getAllKeys();

			return key_;
		} catch (error) {
			console.log(error);
		}
	},

	async _retriveData(key) {
		try {
			let item_ = await AsyncStorage.getItem(key);

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
			}
		} catch (error) {
			console.log(error);
		}
	},

	async _storeData(key, value) {
		try {
			if (acceptDataType[ typeof value ]){
				let v_ = "";

				if (value instanceof Array || (typeof value === "object" || value instanceof Object)){
					v_ = JSON.stringify(value);
				}else if ((Number.isInteger(value) || Number.isFinite(value)) && !Number.isNaN(value)){
					v_ = value.toString();
				}else if (typeof value === "boolean" || value instanceof Boolean){
                    if (value) {
                        v_ = "true";
                    }else{
                        v_ = "false";
                    }
                }else{
					v_ = value;
				}

				await AsyncStorage.setItem(key, v_);
				return true;
			}else{
				let name_ = Object.keys(value);
				console.log("StorageLiteService: _storeData(); type of value "+name_[0]+"("+(typeof value)+") is not valid type.");
			}
		} catch (error) {
			console.log(error);
		}
	},

	async _removeData(key) {
		try {
			await AsyncStorage.removeItem(key);
			return true;
		} catch (error) {
			console.log(error);
		}
	},

	async _truncateData() {
		try {
			await AsyncStorage.clear();
			return true;
		} catch (error) {
			console.log(error);
		}
	}
}
