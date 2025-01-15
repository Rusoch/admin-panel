"use client";
import { useState } from "react";
import axios from "axios";
import { User} from "./UserList";

interface UserFormProps {
	closeForm: () => void;
	refreshUsers: (newUser: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ closeForm, refreshUsers }) => {
	const [firstName, setFirstName] = useState<string>("");
	const [lastName, setLastName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [age, setAge] = useState<string>("");
	const [role, setRole] = useState<string>("");
	const [address, setAddress] = useState<string>("");

	const defaultImage = "https://shorturl.at/bpLmB";

	const newUser = {
		firstName: firstName.trim(),
		lastName: lastName.trim(),
		email: email.trim(),
		age,
		role,
		address: address.trim(),
		image: defaultImage,
	};

	const handleSubmitForm = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!firstName || !lastName || !email || !role || !address) {
			alert("All fields are required!");
			return;
		}

		if (age < "18") {
			alert("You must be 18 or older to access this content.");
			return;
		}

		try {
			const response = await axios.post(
				"https://dummyjson.com/users/add",
				newUser
			);
			refreshUsers(response.data);
			closeForm();
		} catch (err) {
			console.error("Error adding user:", err);
			alert("An error occurred while adding the user. Please try again.");
		}
	};

	return (
		<div>
			<form
				onSubmit={handleSubmitForm}
				className="mt-2.5 mb-2.5 flex items-center flex-col gap-[10px] font-bold text-black w-[60%]"
			>
				<div className="flex justify-center items-center gap-[1.5rem]">
					<label htmlFor="firstName" >First Name</label>
					<input
						type="text"
						placeholder="First Name"
						aria-label="First Name"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
						className="border-2 border-gray-400 px-4 py-2 rounded"
					/>{" "}
				</div>
				<div className="flex justify-center items-center gap-[1.5rem]">
					<label htmlFor="lastname">Last Name</label>
					<input
						type="text"
						placeholder="Last Name"
						aria-label="Last Name"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
						className="border-2 border-gray-400 px-4 py-2 rounded"
					/>
				</div>
				<div className="flex justify-center items-center gap-[3.5rem]">
					<label htmlFor="email">Email</label>

					<input
						type="email"
						placeholder="Email"
						aria-label="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="border-2 border-gray-400 px-4 py-2 rounded"
					/>
				</div>{" "}
				<div className="flex justify-center items-center gap-[3.5rem]">
					<label htmlFor="age">Age</label>

					<input
						type="text"
						placeholder="Age"
						value={age}
						onChange={(e) => setAge(e.target.value)}
						required
						className="border-2 border-gray-400 px-4 py-2 rounded"
					/>
				</div>
				<div className="flex justify-center items-center gap-[3.5rem]">
					<label htmlFor="role">Role</label>

					<input
						type="text"
						placeholder="Role"
						value={role}
						onChange={(e) => setRole(e.target.value)}
						required
						className="border-2 border-gray-400 px-4 py-2 rounded"
					/>
				</div>
				<div className="flex justify-center items-center gap-[2.5rem]">
					<label htmlFor="address">Address</label>
					<input
						type="text"
						placeholder="Address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						required
						className="border-2 border-gray-400 px-4 py-2 rounded"
					/>{" "}
				</div>
				<div className="flex p-[1.25rem] gap-[1.5rem]">
					<button
						type="submit"
						className="border-[3px] border-gray-400 bg-[#0099ff] w-[115px] h-[60px] text-black font-bold px-4 py-2 rounded mb-4"
					>
						Add User
					</button>
					<button
						type="button"
						onClick={closeForm}
						className="border-[3px] border-gray-400 bg-[#0099ff] w-[115px] h-[60px] text-black font-bold px-4 py-2 rounded mb-4"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default UserForm;
