import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid';
import styles from "../styles/modules/modal.module.css"
import { IoMdClose } from "react-icons/io";
import Button from './Button';
import { useDispatch } from 'react-redux';
import { addTodo, updateTodo } from '../slices/todoSlice';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from "framer-motion"

const dropIn = {
    hidden: {
        opacity: 0,
        transform: 'scale(0.9)',
    },
    visible: {
        transform: 'scale(1)',
        opacity: 1,
        transition: {
            duration: 0.1,
            type: 'spring',
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        transform: 'scale(0.9)',
        opacity: 0,
    },
};



const TodoModal = ({ type, modalOpen, setModalOpen, todo }) => {

    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('Incomplete')
    const dispatch = useDispatch();


    useEffect(() => {
        if (type === "update" && todo) {
            setTitle(todo.title);
            setStatus(todo.status);
        } else {
            setTitle('');
            setStatus('Incomplete');
        }
    }, [type, todo, modalOpen])


    const handleSubmit = (e) => {
        e.preventDefault();

        if (title === "") {
            toast.error("Please enter title.")
            return;
        }

        if (title && status) {
            if (type === "add") {
                console.log(type)
                dispatch(addTodo({
                    id: uuid(),
                    title,
                    status,
                    time: new Date().toLocaleString()
                }))
                toast.success("Task Added successfully👍👍")
                setModalOpen(false)
            }

            if (type === 'update') {
                if (todo.title !== title || todo.status !== status) {
                    dispatch(updateTodo({
                        ...todo,
                        title,
                        status
                    }))
                    toast.success("Task Updated successfully👍👍");
                    setModalOpen(false)
                } else {
                    toast.error("No Changes made,Please make some changes")
                }

            }
        }
    }
    return (
        <AnimatePresence>
            {
                modalOpen && (
                    <motion.div
                        className={styles.wrapper}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        <motion.div
                            className={styles.container}
                            variants={dropIn}
                            initial="hidden"
                            animate="visible"
                            exit="exit">
                            <motion.div
                                className={styles.closeButton}
                                onClick={() => setModalOpen(false)}
                                onKeyDown={() => setModalOpen(false)}
                                tabIndex={0}
                                role='button'
                                // animation
                                initial={{ top: 40, opacity: 0 }}
                                animate={{ top: -10, opacity: 1 }}
                                exit={{ top: 40, opacity: 0 }}
                            >
                                <IoMdClose />
                            </motion.div>
                            <form className={styles.form} onSubmit={handleSubmit}>
                                <h1 className={styles.formTitle}>{type === 'update' ? "Update" : "Add"} Task</h1>
                                <label htmlFor="title"
                                >
                                    Title
                                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </label>
                                <label htmlFor="status"

                                >
                                    Status
                                    <select name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value="Incomplete">
                                            Incomplete
                                        </option>
                                        <option value="Complete">
                                            Complete
                                        </option>
                                    </select>
                                </label>
                                <div className={styles.buttonContainer}>
                                    <Button type="submit" variant="primary">{type === 'update' ? "Update" : "Add"} Task</Button>
                                    <Button variant="secondary" onClick={() => setModalOpen(false)}
                                        onKeyDown={() => setModalOpen(false)}
                                    >Cancel</Button>

                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
        </AnimatePresence>
    )
}

export default TodoModal