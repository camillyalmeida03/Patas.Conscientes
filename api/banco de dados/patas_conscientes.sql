-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 30/05/2025 às 22:08
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `patas_conscientes`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `adotante`
--

CREATE TABLE `adotante` (
  `usuario_id` int(11) NOT NULL,
  `sexo` enum('feminino','masculino','naoInformar') DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `cpf` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `ongs`
--

CREATE TABLE `ongs` (
  `usuario_id` int(11) NOT NULL,
  `nome_ong` varchar(100) DEFAULT NULL,
  `cnpj` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `ongs`
--

INSERT INTO `ongs` (`usuario_id`, `nome_ong`, `cnpj`) VALUES
(7, 'qwdacx ', 'fervfdf'),
(20, 'patas', '14.343.242/3455-25');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(155) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `celular` varchar(20) DEFAULT NULL,
  `senha` varchar(100) NOT NULL,
  `foto` varchar(100) DEFAULT NULL,
  `tipo` enum('adotante','ong','parceiro') NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `acessibilidade_ativa` enum('Ligada','Desligada') DEFAULT NULL,
  `tema` enum('Claro','Escuro') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `telefone`, `celular`, `senha`, `foto`, `tipo`, `criado_em`, `acessibilidade_ativa`, `tema`) VALUES
(7, 'João da ONG', 'joao@exemplo.com', '(11) 2345-6789', '(11) 91234-5678', 'novaSenha123', NULL, 'ong', '2025-05-29 19:44:47', NULL, NULL),
(20, 'OTÁVIO DOMINGUES DA SILVA', 'otaviodominguessilva@gmail.com', '(16) 99632-0063', '(16) 99632-0063', '$2b$10$wgfqG3NDSudDAJQQeteWyuUo0d9fEPD25OHA2FdYyRQORNCGBD1HW', '/img/fotos/perfil1.jpg', 'ong', '2025-05-30 18:15:04', NULL, NULL);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `adotante`
--
ALTER TABLE `adotante`
  ADD PRIMARY KEY (`usuario_id`);

--
-- Índices de tabela `ongs`
--
ALTER TABLE `ongs`
  ADD PRIMARY KEY (`usuario_id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `adotante`
--
ALTER TABLE `adotante`
  ADD CONSTRAINT `adotante_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Restrições para tabelas `ongs`
--
ALTER TABLE `ongs`
  ADD CONSTRAINT `ongs_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
