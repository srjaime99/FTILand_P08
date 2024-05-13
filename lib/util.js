function cambiarIDaNombreArea(id){
    id = id.substring(0, 3);
    if(id === "PLA"){
        return("Plaza Mayor")
    }else if(id === "TFW"){
        return("The Far West")
    }else if(id === "PIR"){
        return("Territorio Pirata")
    }else if(id === "CCL"){
        return("Cool Children Land")
    }else if(id === "FUT"){
        return("Calle Futura")
    }else{
        return("Algo ha salido mal")
    }
}