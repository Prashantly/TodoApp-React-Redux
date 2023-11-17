import { useSelector } from "react-redux"
import TodoItem from "./TodoItem";
import styles from "../styles/modules/app.module.css"
import { AnimatePresence, motion } from "framer-motion"

const container = {
    hidden: {
        opacity: 1,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
}

const child = {
    hidden: {
        y: 20,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
    }
}

const AppContent = () => {
    const todoList = useSelector((state) => state.todo.todoList)
    const filterStatus = useSelector((state) => state.todo.filterstatus)
    const sortedTodoList = [...todoList];

    sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time))

    const filteredTodosList = sortedTodoList.filter((item) => {

        if (filterStatus === 'all') {
            return true;
        }

        return item.status.toLowerCase() === filterStatus
    })

    const completedTaskCount = sortedTodoList.reduce((acc, curr) => {
        if (curr.status === "Complete") {
            acc++;
        }
        return acc;
    }, 0)

    const unCompletedTaskCount = todoList.length - completedTaskCount;
    return (
        <>
            <div className={styles.taskCountContainer}>
                <p>Total Tasks: {todoList.length}</p>
                <p style={{ color: "var(--primaryPurple)" }}>Completed Tasks: {completedTaskCount}</p>
                <p style={{ color: "red" }}>Uncompleted Tasks: {unCompletedTaskCount}</p>
            </div>

            <motion.div className={styles.content__wrapper}
                variants={container}
                initial="hidden"
                animate="visible"
            >
                <AnimatePresence>
                    {
                        filteredTodosList && filteredTodosList.length > 0 ? filteredTodosList.map((todo) => <TodoItem todo={todo} key={todo.id} />) :
                            <motion.p
                                className={styles.emptyText}
                                variants={child}
                            >No Todos Found</motion.p>
                    }
                </AnimatePresence>
            </motion.div>
        </>
    )
}

export default AppContent