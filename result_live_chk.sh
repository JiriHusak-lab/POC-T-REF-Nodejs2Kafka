#!/bin/sh

m_exit=0

NODE_PROC_NUM=`ps -ef | grep 'node server.js' | grep -e 'grep' | wc -l`
#echo $NODE_PROC_NUM

POSTGRES_CON_NUM=`ps -ef | grep ':postgresql ESTABLISHED ' | grep -e 'grep' | wc -l`
#echo $POSTGRES_CON_NUM

if [ ${NODE_PROC_NUM} -ne 1 ]
then
        m_exit = 1
fi

if [ ${POSTGRES_CON_NUM} -ne 1 ]
then
        m_exit = 2
fi

return ${m_exit}
