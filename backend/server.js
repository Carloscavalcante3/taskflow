const express = require('express');
const cors = require('cors');
const boardRoutes = require('./routes/boardRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/boards', boardRoutes);

app.get('/', (req, res) => {
    res.send('TaskFlow API está rodando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});