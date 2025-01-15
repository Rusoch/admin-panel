"use client";

import UserForm from "./UserForm";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";

export interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	age: string;
	image?: string | null | undefined;
	role: string;
	address: {
		address: string;
		city: string;
		state: string;
		postalCode: string;
		country: string;
	};
}

const UserList: React.FC = () => {
	const [userList, setUserList] = useState<User[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [showForm, setShowForm] = useState<boolean>(false);
	const [userToDelete, setUserToDelete] = useState<number | null>(null);
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const showFormClick = () => {
		setShowForm((prevState) => !prevState);
	};

	const deleteModal = (userId: number) => {
		setUserToDelete(userId);
		setShowDeleteModal(true);
	};

	const deleteUserClick = async () => {
		if (userToDelete !== null) {
			try {
				await axios.delete(`https://dummyjson.com/users/${userToDelete}`);
				setUserList((prevList) =>
					prevList.filter((user) => user.id !== userToDelete)
				);
				setShowDeleteModal(false);
				setUserToDelete(null);
				setSuccessMessage("User successfully deleted!");
				setTimeout(() => setSuccessMessage(null), 3000);
			} catch (error) {
				console.error("Error deleting user:", error);
			}
		}
	};
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get("https://dummyjson.com/users");

				const usersWithDefaults = response.data.users.map((user: User) => ({
					...user,
					image: user.image || "/https://shorturl.at/bpLmB",
				}));
				setUserList(usersWithDefaults);
				setLoading(false);
			} catch (err) {
				console.error("Error fetching users:", err);
				setError("Failed to fetch users");
				setLoading(false);
			}
		};

		fetchUsers();
	}, []);

	  const refreshUserList = (newUser: User) => {
    setUserList((prevList) => [...prevList, newUser]);
  };
 
	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div>
			<div className="flex justify-between bg-[#ebfaf9] p-[20px]">
				<h1 className="font-serif text-4xl font-bold text-black-500">
					User List
				</h1>
				<button
					onClick={showFormClick}
					className="bg-[#0099ff] text-black font-bold  px-4 py-2 rounded mb-4"
				>
					Add New User
				</button>
			</div>
			{showForm && (
				  <UserForm
				  closeForm={() => setShowForm(false)}
				  refreshUsers={refreshUserList}  
				/>
			)}
			{showDeleteModal && (
				<div>
					<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#ebfaf9] z-50 p-[20px] border-2 border-gray-400">
						<h2 className="mb-[1.5rem]">
							Are you sure you want to delete this user?
						</h2>
						<div className="flex justify-between">
							<button
								onClick={deleteUserClick}
								className=" bg-[#0099ff]  text-white px-4 py-2 rounded"
							>
								Yes, Delete
							</button>
							<button
								onClick={() => setShowDeleteModal(false)}
								className=" bg-[#0099ff]  text-white px-4 py-2 rounded"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}

			{successMessage && (
				<div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
					{successMessage}
				</div>
			)}

			<div className="overflow-x-auto">
				<table className="min-w-full table-auto">
					<thead>
						<tr>
							<th className="border-[2px] border-grey-400">Profile Picture</th>
							<th className="border-[2px] border-grey-400">Name</th>
							<th className="border-[2px] border-grey-400">Email</th>
							<th className="border-[2px] border-grey-400">Age</th>
							<th className="border-[2px] border-grey-400">Role</th>
							<th className="border-[2px] border-grey-400">Address</th>
							<th className="border-[2px] border-grey-400">Delete</th>
						</tr>
					</thead>
					<tbody>
						{userList.map((user) => (
							<tr key={user.id}>
								<td className="border px-4 py-2">
									<Image
										src="https://dummyjson.com/icon/emilys/128"
										alt={`${user.firstName} ${user.lastName}`}
										width={128}
										height={128}
										priority
									/>
								</td>
								<td className="border px-4 py-2">
									{user.firstName} {user.lastName}
								</td>
								<td className="border px-4 py-2">{user.email}</td>
								<td className="border px-4 py-2">{user.age}</td>
								<td className="border px-4 py-2"> {user.role ? user.role : 'user'}
								</td>
								<td className="border px-4 py-2">
									{typeof user.address === "string"
										? user.address
										: user.address?.address
											? `${user.address?.address}, ${user.address?.city}, ${user.address?.state}, ${user.address?.postalCode}, ${user.address?.country}`
											: "Address not available"}{" "}
								</td>
								<td className="border px-4 py-2">
									<button
										className="bg-red-500 text-white px-4 py-2 rounded"
										onClick={() => deleteModal(user.id)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default UserList;
