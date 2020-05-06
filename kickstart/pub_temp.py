#!/usr/bin/env python

import os
from time import sleep
import rospy
from std_msgs.msg import String

def temp():
        pub = rospy.Publisher('rpiinfo', String, queue_size=10)
        rospy.init_node('talker', anonymous=False)
        rate = rospy.Rate(1) # 1hz

        while not rospy.is_shutdown():
                res = os.popen("vcgencmd measure_temp").readline()
                temp = (res.replace("temp=","").replace("'C\n",""))
                rospy.loginfo("Die CPU-Temperatur liegt bei {0} 'C.".format(temp))
                pub.publish(format(temp))
                rate.sleep()

if __name__ == '__main__':
        try:
                temp()
        except rospy.ROSInterruptException:
                pass