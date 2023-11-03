import styles from './Form.module.css';
import { useState } from 'react';
import validation from './validation';


export default function Form(props) {
    const [userData, setUserData] = useState({ name: '', surName: '', userName: '', dateOfBirth: '', email: '', password: '' })
    const [errors, setErrors] = useState({ name: '', surName: '', userName: '', dateOfBirth: '', email: '', password: '' });

    const handleInputChange = (event) => {
        const { name, value } = event.target; // Obtiene el dato ej: name='email' del input
        console.log(name, value);
        setUserData({
            ...userData, // Trae todo lo que ya está en userData
            [name]: value // Altera el valor con el nombre de la propiedad = [nombrePropiedad]
        });
        setErrors(
            validation({
                ...userData,
                [name]: value
            }));
    }

    const handleLogin = (event) => {
        event.preventDefault();
        props.login(userData);
    }

    const handleRegister = (event) => {
        event.preventDefault();
        // props.login(userData);
    }

    return (
        <div className={styles.formsDiv}>
            <div className={styles.loginDiv}>
                <form className={styles.login} onSubmit={handleLogin} >
                    {/* <label htmlFor='email'>Email:</label>
                    <input type='email' key='email' id='email' name='email'
                        value={userData.email} onChange={handleInputChange} />
                    <p>{errors.email && errors.email}</p>
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input type='text' key='password' id='password' name='password'
                        value={userData.password} onChange={handleInputChange} />
                    <p>{errors.password && errors.password}</p>
                    <button type='submit' disabled={!userData.email || !userData.password || (errors.email || errors.password)} >Login</button> */}
                    <table>
                        <tr>
                            <td>
                                <label htmlFor='email'>Email:</label>
                            </td>
                            <td rowspan="2">
                                <input type='email' key='email' id='email' name='email' value={userData.email} onChange={handleInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>{errors.email && errors.email}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="password">Password:</label>
                            </td>
                            <td rowspan="2">
                                <input type='password' key='password' id='password' name='password' value={userData.password} onChange={handleInputChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>{errors.password && errors.password}</p>
                            </td>
                        </tr>
                    <button type='submit' disabled={!userData.email || !userData.password || (errors.email || errors.password)} >Login</button>
                    </table>
                </form>
            </div>
            <div className={styles.registerDiv}>
                <form className={styles.register} onSubmit={handleRegister} >
                    <label htmlFor='name'>Name:</label>
                    <input type='text' key='name' id='name' name='name'
                        value={userData.name} onChange={handleInputChange}
                    />
                    <p>{errors.name && errors.name}</p>
                    <br />
                    <label htmlFor='surName'>Surname:</label>
                    <input type='text' key='surName' id='surName' name='surName'
                        value={userData.surName} onChange={handleInputChange}
                    />
                    <p>{errors.surName && errors.surName}</p>
                    <br />
                    <label htmlFor='userName'>Username:</label>
                    <input type='text' key='userName' id='userName' name='userName'
                        value={userData.userName} onChange={handleInputChange}
                    />
                    <p>{errors.userName && errors.userName}</p>
                    <br />
                    <label htmlFor="dateOfBirth">Date Of Birth:</label>
                    <input type='datetime-local' key='dateOfBirth' id='dateOfBirth' name='dateOfBirth'
                        value={userData.dateOfBirth} onChange={handleInputChange}
                    />
                    <p>{errors.dateOfBirth && errors.dateOfBirth}</p>
                    <br />
                    <label htmlFor='email'>Email:</label>
                    <input type='text' key='email' id='email' name='email'
                        value={userData.email} onChange={handleInputChange}
                    />
                    <p>{errors.email && errors.email}</p>
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input type='text' key='password' id='password' name='password'
                        value={userData.password} onChange={handleInputChange}
                    />
                    <p>{errors.password && errors.password}</p>
                    {/* <label htmlFor="password">Repeat Password:</label>
                    <input type='text' key='password' id='password' name='password'
                        value={userData.password} onChange={handleInputChange}
                    />
                    <p>{errors.password && errors.password}</p> */}
                    <button type='submit' disabled={!userData.email || !userData.password || (errors.email || errors.password)} >Register</button>
                </form>
            </div>
        </div>
    )
}