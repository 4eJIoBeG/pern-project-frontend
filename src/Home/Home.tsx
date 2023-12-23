import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./Home.module.css";
import { useState } from "react";

interface FormState {
  name: string;
  email: string;
}

function Home() {
  const { register, handleSubmit, reset } = useForm<FormState>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit: SubmitHandler<FormState> = (data) => {
    setIsLoading(true);
    fetch("http://localhost:5000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data) return;
        setIsSuccess(true);
        reset();
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isSuccess ? (
          <div className={styles.success}>Форма отправлена!</div>
        ) : (
          <>
            <h1>Оставить заявку</h1>
            <input
              type="name"
              placeholder="Введите имя"
              {...register("name")}
            />
            <input
              type="email"
              placeholder="Введите e-mail"
              {...register("email")}
            />
            <button disabled={isLoading}>
              {isLoading ? "Идет отправка" : "Отправить заявку"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default Home;
