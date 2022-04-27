import { Button, Text } from '@nextui-org/react'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "react-toastify"
import ModalAddCategory from "../../components/category/ModalAddCategory"
import ModalDeleteCategory from "../../components/category/ModalDeleteCategory"
import ModalEditCategory from "../../components/category/ModalEditCategory"
import { GlobalStateContext } from '../../GlobalState'
import { createCategory, deleteCategory, editCategory, getAllCategories } from '../../redux/actions/categoryActions'

function Categories() {
  const state = useContext(GlobalStateContext);
  const [token] = state.token
  const dispatch = useDispatch()
  const [modalAddVisible, setModalAddVisible] = useState(false)
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false)
  const [modalEditVisible, setModalEditVisible] = useState(false)
  const [delId, setDelId] = useState("")
  const [category, setCategory] = useState("")
  const [cate, setCate] = useState({})

  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])

  const onCreateCategory = (category) => {
    if (!category) return toast.error("Category name is required")
    dispatch(createCategory({ name: category }, token));
    setCategory("")
    setModalAddVisible(false);
  }

  const { categories } = useSelector(state => state.category)

  const handleOpenEditModal = (category) => {
    setModalEditVisible(true)
    setCate(category)
  }

  const onEditCategory = ({ name, ...cate }) => {
    dispatch(editCategory({ name, ...cate }, token))
    setCategory("")
    setModalEditVisible(false)
    console.log(cate)
  }

  const handleOpenDeleteModal = (categoryId) => {
    setModalDeleteVisible(true)
    setDelId(categoryId)
  }

  const onDeleteCategory = (id) => {
    dispatch(deleteCategory(id, token));
    setModalDeleteVisible(false)
  }

  return (
    <div className="container full-screen">
      <div className="categories">
        <div className="categories__heading">
          <Text h3 color="white">Category</Text>
          <div>
            <Button
              color="success"
              flat
              auto
              icon={<i className="fa-solid fa-plus"></i>}
              onClick={() => setModalAddVisible(true)}
            >Add</Button>
          </div>
        </div>
        <div>
          <table className="categories__table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Category name</th>
                <th></th>
              </tr>
            </thead>
            {
              categories?.map((cate) => (
                <tbody key={cate._id}>
                  <tr>
                    <td>
                      <span>{cate._id}</span>
                    </td>
                    <td>
                      <span>{cate.name}</span>
                    </td>
                    <td style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <Button css={{ mx: "3px" }} auto flat color="warning" icon={<i className="fa-solid fa-pen-to-square"></i>}
                        onClick={() => handleOpenEditModal(cate)}
                      />
                      <Button css={{ mx: "3px" }} auto flat color="error" icon={<i className="fa-solid fa-trash"></i>}
                        onClick={() => handleOpenDeleteModal(cate._id)}
                      />
                    </td>
                  </tr>
                </tbody>
              ))
            }
          </table>
        </div>
      </div>
      <ModalAddCategory
        open={modalAddVisible}
        onClose={() => setModalAddVisible(false)}
        category={category}
        setCategory={setCategory}
        title="Add new category"
        onCreateCategory={onCreateCategory}
      />
      <ModalDeleteCategory
        delId={delId}
        title="Do you really want to delete this category?"
        open={modalDeleteVisible}
        onClose={() => setModalDeleteVisible(false)}
        onDeleteCategory={onDeleteCategory}
      />
      <ModalEditCategory
        cate={cate}
        title="Edit category"
        open={modalEditVisible}
        onClose={() => setModalEditVisible(false)}
        category={category}
        setCategory={setCategory}
        onEditCategory={onEditCategory}
      />
    </div>
  )
}

export default Categories