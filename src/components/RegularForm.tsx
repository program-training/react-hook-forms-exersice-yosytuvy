import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { emailRegex, passwordRegex } from "../utils/regexEx";

interface UserInterface {
    username: string;
    password: string;
    email: string;
}

const RegularForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<UserInterface>({ mode: "onChange", criteriaMode: "all" });

    return (
        <form
            onSubmit={handleSubmit((data, e) => {
                e?.preventDefault();
                console.log(data);
            })}>
            <h1>You Changed Me To React Hook Form</h1>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    {...register("username", {
                        required: "This is required",
                        minLength: {
                            value: 2,
                            message: "Min lenght is 2",
                        },
                    })}
                    type="text"
                    placeholder="Username"
                />
                <ErrorMessage
                    errors={errors}
                    name="username"
                    render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                            <p key={type}>⚠ {message}</p>
                        ))
                    }
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    {...register("password", {
                        required: "This is required",
                        pattern: {
                            value: passwordRegex,
                            message:
                                "Password must contain at least one uppercase, one lowercase, number, special character, and least 8 characters, no more thatn 20",
                        },
                    })}
                    type="text"
                    placeholder="Password"
                />
                <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                            <p key={type}>⚠ {message}</p>
                        ))
                    }
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    {...register("email", {
                        required: "This is required",
                        pattern: {
                            value: emailRegex,
                            message: "Email not valid",
                        },
                    })}
                    type="text"
                    placeholder="Email"
                />
                <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                            <p key={type}>⚠ {message}</p>
                        ))
                    }
                />
            </div>
            {isValid && <button type="submit">Submit</button>}
        </form>
    );
};

export default RegularForm;
