export interface SignupDto {
  name: string;
  email: string;
  horaInicio: number; // exemplo: 1
  horaFim: number;    // exemplo: 5
  data: string;       // formato: "dd/mm/yyyy"
}



export interface SigninDto {
    email: string;
    password: string;
}