/**
 * SQL query
*/
export const QUERY = {
    // Not good idea to fetch every data in table, alwasy set a limit
    SELECT_PATIENTS: 'SELECT * FROM patients ORDER BY created_at DESC LIMIT 100',
    // Question mark = data add dynamically
    SELECT_PATIENT: 'SELECT * FROM patients WHERE id = ?',
    CREATE_PATIENT: 'INSERT INTO patients(first_name, last_name, email, address, diagnosis, phone, image_url) VALUES(?, ?, ?, ?, ?, ?, ?)',
    UPDATE_PATIENT: 'UPDATE patients SET first_name = ?, last_name = ?, email = ?, address = ?, diagnosis = ?, phone = ?, image_url = ? WHERE id = ?',
    DELETE_PATIENTS: 'DELETE FROM patients WHERE id = ?',
};