class Img{
    constructor(_image){
    this.img = _image;
    }

    create(){
        this.new = document.createElement('img');
        this.new.className = "col-4 p-0 m-3 rounded imgPic";
        this.new.src = `../assets/img/examples/${this.img}`;
        this.new.style.height = '200px'; 
        this.new.style.width = '300px'; 

        document.getElementById('allPic').appendChild(this.new);
    }
}

var pic1 = new Img(`studio-1.jpg`);
var pic2 = new Img(`studio-2.jpg`);
var pic3 = new Img(`studio-3.jpg`);
var pic4 = new Img(`studio-4.jpg`);
var pic5 = new Img(`studio-5.jpg`);
var pic6 = new Img(`studio-1.jpg`);
var pic7 = new Img(`studio-2.jpg`);
var pic8 = new Img(`studio-3.jpg`);
var pic9 = new Img(`studio-4.jpg`);

pic1.create();
pic2.create();
pic3.create();
pic4.create();
pic5.create();
pic6.create();
pic7.create();
pic8.create();
pic9.create();
