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
    /**
     * Return all keys in storage
     * @return {[string]} Array contain keys as string
     */
	async _retriveKeys() {
		try {
			let key_ = await AsyncStorage.getAllKeys();

			return key_;
		} catch (error) {
			console.log(error);
		}
	},

    /**
     * Get data from storage, then convert back to its original form
     * @param {string} key **required** - Key of needed data
     * @param {*} empty Desired return value in case of retriving was failed
     * @return {(object|array|number|string|boolean)} Up to type of stored data, possible be Object, Array, Number, String and Boolean
     */
	async _retriveData(key, empty = false) {
		try {
            let item_ = await AsyncStorage.getItem(key);

			if (item_) {
				if ((/(^(\{).*\}$)|(^(\[).*\]$)/.test(item_))){
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
                return empty;
            }
		} catch (error) {
			console.log(error);
		}
	},

    /**
     * Store data into storage, will convert data to be string form before storing if necessary
     * @param {string} key **required** - Key of data to be stored 
     * @param {(object|array|number|string|boolean)} value **required** - Value to be stored
     * @return {boolean} true in *succeed* case, otherwise will return false 
     */
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
                if (typeof value !== 'undefined') {
				    let name_ = Object.keys(value);
                    console.log("StorageLiteService: _storeData(); type of value "+name_[0]+"("+(typeof value)+") is not valid type.");
                }else{
                    console.log("StorageLiteService: _storeData(); value is undefined.");
                }
                return false;
			}
		} catch (error) {
			console.log(error);
		}
	},

    /**
     * Remove data from storage
     * @param {string} key **required** - Key of data to remove 
     * @return {boolean} true in case of *succeed*
     */
	async _removeData(key) {
		try {
			await AsyncStorage.removeItem(key);
			return true;
		} catch (error) {
			console.log(error);
		}
	},

    /**
     * Remove ***all*** data from storage
     * @return {boolean} true in case of *succeed*
     */
	async _truncateData() {
		try {
			await AsyncStorage.clear();
			return true;
		} catch (error) {
			console.log(error);
		}
	}
}
