class Camera{
    constructor(jsonCamera){
        jsonCamera && Object.assign(this, jsonCamera);
    }
}