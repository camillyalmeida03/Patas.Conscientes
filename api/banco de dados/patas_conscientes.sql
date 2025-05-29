-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 29/05/2025 às 21:58
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

--
-- Despejando dados para a tabela `adotante`
--

INSERT INTO `adotante` (`usuario_id`, `sexo`, `data_nascimento`, `cpf`) VALUES
(8, 'masculino', '2024-01-17', '1234562345'),
(12, 'masculino', '2024-01-17', '1234562345'),
(13, 'masculino', '2024-01-17', '522.172.878-85');

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
(7, 'qwdacx ', 'wdesfvfds');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `celular` varchar(20) DEFAULT NULL,
  `sexo` enum('feminino','masculino','naoInformar') DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `cpf` varchar(25) DEFAULT NULL,
  `senha` varchar(100) NOT NULL,
  `comentario` varchar(300) DEFAULT NULL,
  `foto` varchar(155) DEFAULT NULL,
  `tipo_de_user` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `telefone`, `celular`, `sexo`, `data_nascimento`, `cpf`, `senha`, `comentario`, `foto`, `tipo_de_user`) VALUES
(1, 'João da Silva', 'joao@email.com', '(11) 1234-5678', '(11) 91234-5678', 'masculino', '2000-05-15', '123.456.789-00', 'senha123segura', 'Gosto de tecnologia e programação.', 'imagens/joao_perfil.jpg', 0),
(6, 'João da Silva', 'joao@email.coms', '(11) 1234-56782', '(11) 91234-56782', 'masculino', '2000-05-15', '123.456.789-01', '$2b$10$nXTxLhJ62aJNL4bZFfUypuJ6PEpidlfGtIdT2o8O8Eq61WLzq9Zp6', NULL, NULL, 0),
(9, 'OTÁVIO DOMINGUES DA SILVA', 'otaviodominguessilva@gmail.com', '(16) 9963-20063', '(11) 11111-1111', 'masculino', '2024-01-17', '522.172.878-85', '$2b$10$P3pOUk.1LxDkZoPQltbrFeLh5lN5jklTt3j8H6h53RdAnQ3JBNh4G', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuariospadrao`
--

CREATE TABLE `usuariospadrao` (
  `id` int(11) NOT NULL,
  `nome` varchar(155) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `celular` varchar(20) DEFAULT NULL,
  `senha` varchar(100) NOT NULL,
  `foto` varchar(100) DEFAULT NULL,
  `tipo` enum('adotante','ong','parceiro') NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuariospadrao`
--

INSERT INTO `usuariospadrao` (`id`, `nome`, `email`, `telefone`, `celular`, `senha`, `foto`, `tipo`, `criado_em`) VALUES
(7, 'dedvsf vdd', 'dasdascx ', 'qwdas', 'qdsac', '$2b$10$rBaRpD6lH34GwBoGlvwBQe.GrHDSkz0OpVqcFFS1i57XcppgseE3q', '/uploads/foto_perfil/1748547886996-Captura de tela 2025-02-06 201543.png', 'ong', '2025-05-29 19:44:47'),
(8, 'dddddddd', 'sddddddddddddddd', '213243543', '12345645', '$2b$10$/oMmRHETLePO7epz8dcp0eMO1COSjO.Gox94VkqQLnQMpLTUaamEq', '/uploads/foto_perfil/1748547904157-Captura de tela 2025-02-04 163541.png', 'adotante', '2025-05-29 19:45:04'),
(12, 'dddwqasdddddd', 'sdddddddddddddddads', '21343543', '1234545', '$2b$10$6bNAi9RswF4g4mAn12WykOeb6T.Ki7R/u9SYURAeErJzgJGhkfP2O', '/uploads/foto_perfil/1748548518514-Captura de tela 2025-02-04 163541.png', 'adotante', '2025-05-29 19:55:18'),
(13, 'OTÁVIO DOMINGUES DA SILVA', 'otaviodominguessilva@gmail.com', '(16) 9963-20063', '(11) 11111-1111', '$2b$10$PLccfnHpvYn8VB0ESPfglOM4uOEOkTNMvdrtZVNtKPzRg8PckqZt.', NULL, 'adotante', '2025-05-29 19:57:45');

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
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `cpf` (`cpf`);

--
-- Índices de tabela `usuariospadrao`
--
ALTER TABLE `usuariospadrao`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `usuariospadrao`
--
ALTER TABLE `usuariospadrao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `adotante`
--
ALTER TABLE `adotante`
  ADD CONSTRAINT `adotante_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuariospadrao` (`id`);

--
-- Restrições para tabelas `ongs`
--
ALTER TABLE `ongs`
  ADD CONSTRAINT `ongs_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuariospadrao` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
