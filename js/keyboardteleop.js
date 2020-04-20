/**
 * @uthor Adam Siwy rosexplorer.io
 * 
 * based on former work of:
 * 
 * @author Russell Toris - rctoris@wpi.edu
 */

var KEYBOARDTELEOP = KEYBOARDTELEOP || {
    REVISION : '0.0.1'
  };
  
  /**
   * @author Russell Toris - rctoris@wpi.edu
   */
  
  /**
   * Manages connection to the server and all interactions with ROS.
   *
   * Emits the following events:
   *   * 'change' - emitted with a change in speed occurs
   *
   * @constructor
   * @param options - possible keys include:
   *   * ros - the ROSLIB.Ros connection handle
   *   * topic (optional) - the Twist topic to publish to, like '/cmd_vel'
   *   * throttle (optional) - a constant throttle for the speed
   */
  KEYBOARDTELEOP.Teleop = function(options) {
    var that = this;
    options = options || {};
    var ros = options.ros;
    var topic = options.topic || '/cmd_vel';
    // permanent throttle
    var throttle = options.throttle || 1.0;
  
    // used to externally throttle the speed (e.g., from a slider)
    this.scale = 1.0;
  
    // linear x and y movement and angular z movement
    var x = 0;
    var y = 0;
    var z = 0;
  
    // var cmdVel = new ROSLIB.Topic({
    //   ros : ros,
    //   name : topic,
    //   messageType : 'geometry_msgs/Twist'
    // });
  
    // sets up a key listener on the page used for keyboard teleoperation
    var handleKey = function(keyCode, keyDown) {
      // used to check for changes in speed
      var oldX = x;
      var oldY = y;
      var oldZ = z;
      
      var pub = true;
  
      var speed = 0;
      // throttle the speed by the slider and throttle constant
      if (keyDown === true) {
        speed = throttle * that.scale;
      }
      // check which key was pressed
      switch (keyCode) {
        case 65:
          // turn left
          z = 1 * speed;
          break;
        case 87:
          // up AKA W
          x = 0.5 * speed;
          break;
        case 68:
          // turn right
          z = -1 * speed;
          break;
        case 83:
          // down
          x = -0.5 * speed;
          break;
        case 69:
          // strafe right
          y = -0.5 * speed;
          break;
        case 81:
          // strafe left
          y = 0.5 * speed;
          break;
        default:
          pub = false;
      }
  
      // publish the command
      if (pub === true) {
        // var twist = new ROSLIB.Message({
        var twist = ({
          angular : {
            x : 0,
            y : 0,
            z : z
          },
          linear : {
            x : x,
            y : y,
            z : z
          }
        });
        // cmdVel.publish(twist);
  
        // check for changes
        if (oldX !== x || oldY !== y || oldZ !== z) {
        //   that.emit('change', twist);
            console.log(twist);
        }
      }
    };
  
    // handle the key
    var body = document.getElementsByTagName('body')[0];
    body.addEventListener('keydown', function(e) {
      handleKey(e.keyCode, true);
      console.log(e.keyCode);
    }, false);
    body.addEventListener('keyup', function(e) {
      handleKey(e.keyCode, false);
    }, false);

    // Handles Buttonclicks on UI Elements
    let btnw = document.getElementById('btn-w');
    btnw.addEventListener('click', function(e) {
        handleKey(87, true);
        console.log('W KEY Clicked');
      }, false);
    let btna = document.getElementById('btn-a');
    btna.addEventListener('click', function(e) {
        handleKey(65, true);
        console.log('A KEY Clicked');
      }, false);
    let btns = document.getElementById('btn-s');
    btns.addEventListener('click', function(e) {
        handleKey(83, true);
        console.log('S KEY Clicked');
      }, false);
    let btnd = document.getElementById('btn-d');
    btnd.addEventListener('click', function(e) {
        handleKey(68, true);
        console.log('D KEY Clicked');
      }, false);
  };
//   We don't need this at this moment! 20.4.2020 22:28
//   KEYBOARDTELEOP.Teleop.prototype.__proto__ = EventEmitter2.prototype;
  