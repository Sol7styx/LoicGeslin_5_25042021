//Assigner les propriétés du format json à la class Camera
class Camera{
    constructor(jsonCamera){
        jsonCamera && Object.assign(this, jsonCamera);
    }
}