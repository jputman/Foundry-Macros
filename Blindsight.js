const tokenD = args[args.length -1];
let currentBlindSight = tokenD.data.flags["conditional-visibility"].blindsight;
if(args[0] == "on"){
    newBlindsight = currentBlindSight + 30;
}
else if(args[0] == "off"){
    newBlindsight = currentBlindSight - 30;
    if(newBlindsight < 0){
        newBlindsight = 0;
    }
}
let newData = {
  flags : {
    'conditional-visibility' : {
      blindsight : newBlindsight
    }
  }
}
tokenD.document.update(newData);