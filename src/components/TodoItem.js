import React, { useEffect, useState } from 'react'
import styles from "../styles/modules/todoItem.module.css"
import { getClasses } from '../utils/getClasses'
import { format } from 'date-fns'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { deleteTodo, updateTodo } from '../slices/todoSlice';
import TodoModal from './TodoModal';
import { motion } from "framer-motion"
import CheckButton from './CheckButton';

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

const TodoItem = ({ todo }) => {
    const dispatch = useDispatch();
    const [updateTodoModalOpen, setUpdateTodoModalOpen] = useState(false)
    const [checked, setChecked] = useState(false);


    useEffect(() => {
        if (todo.status === 'Complete') {
            setChecked(true);
        } else {
            setChecked(false)
        }
    }, [todo.status])

    //handle Delete TODO
    const handleDelete = () => {
        dispatch(deleteTodo(todo.id))
        toast.success("Todo deleted successfully")
    }

    //handle Update TODO
    const handleUpdate = () => {
        setUpdateTodoModalOpen(true);
    }

    const handleCheck = () => {
        setChecked(!checked)
        dispatch(updateTodo({
            ...todo,
            status: checked ? "Incomplete" : "Complete"
        }))
    }
    return (
        <>
            <motion.div className={styles.item} variants={child}>
                <div className={styles.todoDetails}>
                    <CheckButton checked={checked} handleCheck={handleCheck} />
                    <div className={styles.texts}>
                        <p className={getClasses([styles.todoText, todo.status === 'Complete' && styles["todoText--completed"]])}>{todo.title}</p>
                        <p className={styles.time}>{format(new Date(todo.time), "h:mm a, MM/dd/yyyy")}</p>

                    </div>
                </div>
                <div className={styles.todoActions}>
                    <div className={styles.icon}
                        onClick={handleUpdate}
                        onKeyDown={handleUpdate}
                        role='button'
                        tabIndex={0}>
                        <MdEdit />
                    </div>
                    <div className={styles.icon}
                        onClick={handleDelete}
                        onKeyDown={handleDelete}
                        role='button'
                        tabIndex={0}>
                        <MdDelete />
                    </div>
                </div>
            </motion.div>
            <TodoModal type="update" todo={todo} modalOpen={updateTodoModalOpen} setModalOpen={setUpdateTodoModalOpen} />
        </>
    )
}

export default TodoItem