"use client"
import Header from '@/components/header/header';
import styles from './page.module.css';
import Menu from '@/components/menu/menu';
import api from '@/services/api';
import { Key, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Members = () => {

    const [members, setMembers] = useState('')
    const cookies: any = Cookies.get("user");
    const user = JSON.parse(cookies);
    const adm = user.user.type === "adm";
    const [popUp, setPopUp] = useState(false)

    async function getMembers() {
        await api.get(`user/all`, {
            headers: {
                'Authorization': `Bearer ${user.token}`,
            }
        }).
            then((response) => {
                setMembers(response.data.users)
            })
            .catch((error) => { console.log(error) })
    }

    useEffect(() => {
        getMembers()
    }, [members])

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.container2}>
                <Menu />
                <div>
                    {
                        members.map((member: any, index: Key | null | undefined) => (
                            <div className={styles.containerMember} key={index} style={index == 0 ? { marginTop: '5vh' } : {}}></div>
                        ))
                    }
                </div>
                <div className={styles.containerButtons} >
                    <div className={styles.button} style={{ backgroundColor: '#2A73C5' }}>
                        <p className={styles.textButton} onClick={() => setPopUp(true)}>
                            Criar Novo Usuário
                        </p>
                    </div>

                    <div className={styles.button} style={{ backgroundColor: '#2A73C5', }}>
                        <p className={styles.textButton}>
                            Excluir Usuário
                        </p>
                    </div>
                    <div className={styles.button} style={{ backgroundColor: '#162369', boxShadow: '0px 4px 0px #111A4F' }}>
                        <p className={styles.textButton}>
                            Exibir Detalhes
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Members;