class CameraManager{
    constructor(listCamera){
        this.listCamera = listCamera;
    }

    sort(){
        return this.listCamera.sort((a,b) => {
            return (a.name > b.name)?1:-1;
        })
    }
}