import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../Forms/CategoryForm";
import { useAuth } from "../../context/auth";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [auth] = useAuth();
  const [visible, setVisible] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [selected, setSelected] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/v1/category/create-category",
        { name },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wromg in input form");
    }
  };

  // fetch all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios("/api/v1/category/getAll-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //update category

  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updateName },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data?.success) {
        setSelected(null);
        setUpdateName("");
        setVisible(false);
        toast.success(`${updateName} is updated`);
        getAllCategory();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while updating");
    }
  };
  //delete category

  const deleteHandler = async (pId, pName) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pId}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (data.success) {
        toast.success(`${pName} is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while updating");
    }
  };

  return (
    <Layout title={"admin-create-category"}>
      <div className="admin-dashboard">
        <div className="admin-col-1">
          <AdminMenu />
        </div>
        <div className="admin-col-2">
          <div className="admin-card">
            <h2>Manage Category</h2>
            <div>
              <CategoryForm
                submitHandler={submitHandler}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="item-section">
              <div className="items">
                <ul>
                  <li>Name</li>
                  <li>Action</li>
                </ul>
                {categories?.map((item) => (
                  <ul id="collection-name" key={item._id}>
                    <li >{item.name}</li>
                    <li>
                      <button
                        className="edit-button"
                        onClick={() => {
                          setVisible(true);
                          setUpdateName(item.name);
                          setSelected(item);
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => {
                          deleteHandler(item._id, item.name);
                        }}
                      >
                        <FaRegTrashAlt />
                      </button>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            open={visible}
          >
            <CategoryForm
              value={updateName}
              setValue={setUpdateName}
              submitHandler={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
