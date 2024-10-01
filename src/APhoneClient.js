/**
 *  abstract class
 */
export default class APhoneClient {
    constructor(options) {
        this._OperatorConsoleAsParent = options["operatorConsoleAsParent"];
    }

    getOperatorConsoleAsParent(){
        return this._OperatorConsoleAsParent;
    }

    /**
     *  abstract method
     */
    getCallInfos(){
        throw new Error("Not implemented.");
        return null;
    }

    /**
     *  virtual method
     * @param options
     */
    initPhoneClient(options) {
    }

    /**
     *  virtual method
     */
    deinitPhoneClient() {
    }

    // /**
    //  *  abstract method
    //  * @returns {Promise<err>}
    //  */
    // async setAppDataAsync(dataId, data ) {
    //     throw new Error("Not implemented.");
    // }

    // /**
    //  *  abstract method
    //  * @param options
    //  * @returns {Promise<*>}
    //  */
    // async getContactListAsync( options ){
    //     throw new Error("Not implemented");
    // }

    // /**
    //  *  abstract method
    //  * @param options
    //  * @returns {Promise<*>}
    //  */
    // async getContactAsync( options ){
    //     throw new Error("Not implemented");
    // }

    //     /**
    //  *  abstract method
    //  * @param tenant
    //  */
    // getNoteNamesPromise(tenant, filter) {
    //     throw new Error("Not implemented.");
    // }


    // /**
    //  *  abstract method
    //  * @param tenant
    //  * @param name
    //  */
    // getNote(tenant, name) {
    //     throw new Error("Not implemented.");
    // }

    // /**
    //  *  abstract method
    //  * @param tenant
    //  * @param name
    //  * @param content
    //  */
    // async setNoteByPhoneClient(tenant, name, content) {
    //     throw new Error("Not implemented.");
    // }

    /**
     *  abstract method
     */
    isPalReady() {
        throw new Error("Not implemented.");
    }

    /**
     *  abstract method
     * @returns {Promise<void>}
     */
    async bargeAsync(tenant, user, talker_id) {
        throw new Error("Not implemented.");
    }

    /**
     *  abstract method
     * @param tenant
     * @param dialing
     * @param talkerId
     * @param mode
     * @returns {Promise<void>}
     */
    async transferAsync(tenant, dialing, talkerId, mode) {
        throw new Error("Not implemented.");
    }

    /**
     *  abstract method
     * @param tenant
     * @param talkerId
     * @param number
     * @returns {Promise<void>}
     */
    async parkAsync(tenant, talkerId, number) {
        throw new Error("Not implemented.");
    }

    /**
     *  abstract method
     * @param tenant
     * @param talker_id
     * @param signal
     */
    sendDTMF(tenant, talker_id, signal) {
        throw new Error("Not implemented.");
    }

    /**
     *  abstract method
     * @param line
     * @param status
     * @returns {Promise<void>}
     */
    async lineAsync(line, status) {
        throw new Error("Not implemented.");
    }

    // /**
    //  *  abstract method
    //  * @param tenant
    //  * @param extension
    //  */
    // getAdminExtensionPropertiesPromise(tenant, extension) {
    //     throw new Error("Not implemented.");
    // }

    /**
     *  abstract method
     * @param sDialing
     * @param bUsingLine
     */
    callByPhoneClient(sDialing, bUsingLine) {
        throw new Error("Not implemented.");
    }
}