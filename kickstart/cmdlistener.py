#!/usr/bin/env python

import rospy
import tf.transformations
from geometry_msgs.msg import Twist

def picarcmd(msg):
    rospy.loginfo("Empfaengt eine /cmd_vel msg")
    rospy.loginfo("Linear vorwaerts+  und rueckwaerts-: [%f, %f, %f]"%(msg.linear$    rospy.loginfo("Angular links+ und rechts-: [%f, %f, %f]"%(msg.angular.x, msg.$

    # Hier die entsprechenden PiCar Werte hinterlegen:
    # Setup aus line_follower.py Zeile 22-27

    forward_speed = 80
    backward_speed = 70
    turning_angle = 40

    # ... usw.

    # fw steht fuer front_wheels bw steht fuer back_wheels

    # Blaupause msg.linear.x wenn > 0
    # bw.forward()
    # ggf dynamisch mit einem wert
    # wenn < 0
    # bw.backward()

    # Blaupause msg.angular.z wenn > 0
    # fw.turn(winkel_nach_links) # tmp_angle
    # wenn < 0
    # fw.turn(winkel_nach_rechts) #tmp_angle

def listener():
    rospy.init_node('picar_cmd_vel_listener')
    rospy.Subscriber("/cmd_vel", Twist, picarcmd)
    rospy.spin()

if __name__ == '__main__':
    listener()