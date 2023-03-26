export const getUser = ({ email, password }) => `
  SELECT * FROM users 
  WHERE 
    user_email = "${email}" AND user_password = "${password}"
`;
