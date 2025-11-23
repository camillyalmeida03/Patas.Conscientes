-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 23/11/2025 às 21:56
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
-- Banco de dados: `patasconscientes`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `bairros`
--

CREATE TABLE `bairros` (
  `idbairro` int(11) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `fk_idcidade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `bairros`
--

INSERT INTO `bairros` (`idbairro`, `bairro`, `fk_idcidade`) VALUES
(2, 'Jardim Novo Mundo', 2),
(3, 'Nova Cidade', 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `cidades`
--

CREATE TABLE `cidades` (
  `idcidade` int(11) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `fk_idestado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `cidades`
--

INSERT INTO `cidades` (`idcidade`, `cidade`, `fk_idestado`) VALUES
(2, 'Matão', 26);

-- --------------------------------------------------------

--
-- Estrutura para tabela `enderecos`
--

CREATE TABLE `enderecos` (
  `idendereco` int(11) NOT NULL,
  `fk_idcidade` int(11) NOT NULL,
  `fk_idbairro` int(11) NOT NULL,
  `fk_idrua` int(11) NOT NULL,
  `fk_idestado` int(11) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `cep` varchar(9) NOT NULL,
  `complemento` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `enderecos`
--

INSERT INTO `enderecos` (`idendereco`, `fk_idcidade`, `fk_idbairro`, `fk_idrua`, `fk_idestado`, `numero`, `cep`, `complemento`) VALUES
(2, 2, 2, 2, 26, '1098', '15997-422', '(Tico Geraldo)'),
(3, 2, 3, 3, 26, '1098', '15991-504', '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `especiespet`
--

CREATE TABLE `especiespet` (
  `idespeciepet` int(11) NOT NULL,
  `especie` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `estados`
--

CREATE TABLE `estados` (
  `idestado` int(11) NOT NULL,
  `sigla` varchar(2) NOT NULL,
  `estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `estados`
--

INSERT INTO `estados` (`idestado`, `sigla`, `estado`) VALUES
(2, 'AC', 'Acre'),
(3, 'AL', 'Alagoas'),
(4, 'AP', 'Amapá'),
(5, 'AM', 'Amazonas'),
(6, 'BA', 'Bahia'),
(7, 'CE', 'Ceará'),
(8, 'DF', 'Distrito Federal'),
(9, 'ES', 'Espírito Santo'),
(10, 'GO', 'Goiás'),
(11, 'MA', 'Maranhão'),
(12, 'MT', 'Mato Grosso'),
(13, 'MS', 'Mato Grosso do Sul'),
(14, 'MG', 'Minas Gerais'),
(15, 'PA', 'Pará'),
(16, 'PB', 'Paraíba'),
(17, 'PR', 'Paraná'),
(18, 'PE', 'Pernambuco'),
(19, 'PI', 'Piauí'),
(20, 'RJ', 'Rio de Janeiro'),
(21, 'RN', 'Rio Grande do Norte'),
(22, 'RS', 'Rio Grande do Sul'),
(23, 'RO', 'Rondônia'),
(24, 'RR', 'Roraima'),
(25, 'SC', 'Santa Catarina'),
(26, 'SP', 'São Paulo'),
(27, 'SE', 'Sergipe'),
(28, 'TO', 'Tocantins');

-- --------------------------------------------------------

--
-- Estrutura para tabela `funcionarios`
--

CREATE TABLE `funcionarios` (
  `idfuncionario` int(11) NOT NULL,
  `fk_idusuario` int(11) NOT NULL,
  `fk_idong` int(11) NOT NULL,
  `fk_idresponsavel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `ongs`
--

CREATE TABLE `ongs` (
  `idong` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `cnpj` varchar(18) NOT NULL,
  `telefone` varchar(14) NOT NULL,
  `descricao` varchar(250) NOT NULL,
  `foto` text DEFAULT NULL,
  `banner` text DEFAULT NULL,
  `fk_idendereco` int(11) NOT NULL,
  `comp_estatuto` text DEFAULT NULL,
  `comp_cnpj` text DEFAULT NULL,
  `email` varchar(250) NOT NULL,
  `senha` varchar(250) NOT NULL,
  `data_criacao` datetime NOT NULL DEFAULT current_timestamp(),
  `data_att` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fk_idtipo` int(11) NOT NULL,
  `fk_idresponsavel` int(11) DEFAULT NULL,
  `fk_idfuncionarios` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `ongsfavoritadas`
--

CREATE TABLE `ongsfavoritadas` (
  `idongfavoritada` int(11) NOT NULL,
  `fk_idusuario` int(11) NOT NULL,
  `fk_idong` int(11) NOT NULL,
  `data_favoritada` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pets`
--

CREATE TABLE `pets` (
  `idpet` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `fk_idsexopet` int(11) NOT NULL,
  `fk_idespecie` int(11) NOT NULL,
  `fk_idraca` int(11) NOT NULL,
  `fk_idporte` int(11) NOT NULL,
  `fk_idresponsavel` int(11) NOT NULL,
  `fk_idong` int(11) NOT NULL,
  `peso` decimal(5,2) UNSIGNED NOT NULL,
  `idade` int(11) NOT NULL,
  `vacinado` tinyint(1) DEFAULT NULL,
  `descricao` varchar(200) DEFAULT NULL,
  `fotos` text NOT NULL,
  `data_post` datetime NOT NULL DEFAULT current_timestamp(),
  `data_att` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fk_idstatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `petsfavoritados`
--

CREATE TABLE `petsfavoritados` (
  `idpetfavoritado` int(11) NOT NULL,
  `fk_idusuario` int(11) NOT NULL,
  `fk_idpet` int(11) NOT NULL,
  `data_favoritado` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `portespet`
--

CREATE TABLE `portespet` (
  `idportepet` int(11) NOT NULL,
  `porte` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `racaspet`
--

CREATE TABLE `racaspet` (
  `idracapet` int(11) NOT NULL,
  `raca` varchar(100) NOT NULL,
  `fk_idespeciepet` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `redessociais`
--

CREATE TABLE `redessociais` (
  `idredesocial` int(11) NOT NULL,
  `fk_idong` int(11) NOT NULL,
  `plataforma` varchar(50) NOT NULL,
  `link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `responsaveis`
--

CREATE TABLE `responsaveis` (
  `idresponsavel` int(11) NOT NULL,
  `fk_idusuario` int(11) NOT NULL,
  `fk_idong` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `ruas`
--

CREATE TABLE `ruas` (
  `idrua` int(11) NOT NULL,
  `rua` varchar(150) NOT NULL,
  `fk_idbairro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `ruas`
--

INSERT INTO `ruas` (`idrua`, `rua`, `fk_idbairro`) VALUES
(2, 'Avenida Dario Geraldo', 2),
(3, 'Avenida Oneida Travassos Dourado', 3);

-- --------------------------------------------------------

--
-- Estrutura para tabela `sexo`
--

CREATE TABLE `sexo` (
  `idsexo` int(11) NOT NULL,
  `sexo` varchar(17) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `sexo`
--

INSERT INTO `sexo` (`idsexo`, `sexo`) VALUES
(1, 'Masculino'),
(2, 'Feminino'),
(3, 'Prefiro não dizer');

-- --------------------------------------------------------

--
-- Estrutura para tabela `sexospet`
--

CREATE TABLE `sexospet` (
  `idsexopet` int(11) NOT NULL,
  `sexopet` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `status`
--

CREATE TABLE `status` (
  `idstatus` int(11) NOT NULL,
  `status` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tipos_usuario`
--

CREATE TABLE `tipos_usuario` (
  `idtipo` int(11) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `descricao` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `tipos_usuario`
--

INSERT INTO `tipos_usuario` (`idtipo`, `tipo`, `descricao`) VALUES
(1, 'Desenvolvedor', 'Possui acesso ao código-fonte, manutenção do sistema, criação e edição de funcionalidades, gerenciamento de banco de dados e APIs, com restrição a dados sensíveis e aprovações administrativas.'),
(3, 'Padrão', 'Um usuário padrão pode criar e gerenciar seu perfil, visualizar animais disponíveis para adoção, conhecer as ONGs cadastradas e demonstrar interesse em adotar, mas não tem permissão para cadastrar ou editar informações de animais ou organizações.'),
(4, 'ONG', 'ONG pode cadastrar e gerenciar os animais disponíveis para adoção, atualizar suas informações de perfil (como endereço, contato e missão da organização), responder às manifestações de interesse dos usuários e divulgar conteúdos sobre seus projetos. Diferente do usuário comum, a ONG tem papel ativo n');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `idusuario` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(250) NOT NULL,
  `telefone` varchar(15) DEFAULT NULL,
  `fk_idsexo` int(11) NOT NULL,
  `data_nasc` date NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `senha` varchar(250) NOT NULL,
  `data_criacao` datetime NOT NULL DEFAULT current_timestamp(),
  `data_att` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `foto` text DEFAULT NULL,
  `fk_idendereco` int(11) NOT NULL,
  `fk_idtipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `bairros`
--
ALTER TABLE `bairros`
  ADD PRIMARY KEY (`idbairro`),
  ADD KEY `fk_idcidade` (`fk_idcidade`);

--
-- Índices de tabela `cidades`
--
ALTER TABLE `cidades`
  ADD PRIMARY KEY (`idcidade`),
  ADD KEY `fk_idestado` (`fk_idestado`);

--
-- Índices de tabela `enderecos`
--
ALTER TABLE `enderecos`
  ADD PRIMARY KEY (`idendereco`),
  ADD KEY `fk_idcidade` (`fk_idcidade`),
  ADD KEY `fk_idbairro` (`fk_idbairro`),
  ADD KEY `fk_idrua` (`fk_idrua`),
  ADD KEY `fk_idestado` (`fk_idestado`);

--
-- Índices de tabela `especiespet`
--
ALTER TABLE `especiespet`
  ADD PRIMARY KEY (`idespeciepet`);

--
-- Índices de tabela `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`idestado`);

--
-- Índices de tabela `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD PRIMARY KEY (`idfuncionario`),
  ADD KEY `fk_idusuario` (`fk_idusuario`),
  ADD KEY `fk_idong` (`fk_idong`),
  ADD KEY `fk_idresponsavel` (`fk_idresponsavel`);

--
-- Índices de tabela `ongs`
--
ALTER TABLE `ongs`
  ADD PRIMARY KEY (`idong`),
  ADD UNIQUE KEY `cnpj` (`cnpj`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_idendereco` (`fk_idendereco`),
  ADD KEY `fk_idtipo` (`fk_idtipo`),
  ADD KEY `FK_ONG_RESPONSAVEL` (`fk_idresponsavel`),
  ADD KEY `FK_ONG_FUNCIONARIO` (`fk_idfuncionarios`);

--
-- Índices de tabela `ongsfavoritadas`
--
ALTER TABLE `ongsfavoritadas`
  ADD PRIMARY KEY (`idongfavoritada`),
  ADD KEY `fk_idusuario` (`fk_idusuario`),
  ADD KEY `fk_idong` (`fk_idong`);

--
-- Índices de tabela `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`idpet`),
  ADD KEY `fk_idsexopet` (`fk_idsexopet`),
  ADD KEY `fk_idespecie` (`fk_idespecie`),
  ADD KEY `fk_idraca` (`fk_idraca`),
  ADD KEY `fk_idporte` (`fk_idporte`),
  ADD KEY `fk_idresponsavel` (`fk_idresponsavel`),
  ADD KEY `fk_idong` (`fk_idong`),
  ADD KEY `fk_idstatus` (`fk_idstatus`);

--
-- Índices de tabela `petsfavoritados`
--
ALTER TABLE `petsfavoritados`
  ADD PRIMARY KEY (`idpetfavoritado`),
  ADD KEY `fk_idusuario` (`fk_idusuario`),
  ADD KEY `fk_idpet` (`fk_idpet`);

--
-- Índices de tabela `portespet`
--
ALTER TABLE `portespet`
  ADD PRIMARY KEY (`idportepet`);

--
-- Índices de tabela `racaspet`
--
ALTER TABLE `racaspet`
  ADD PRIMARY KEY (`idracapet`),
  ADD KEY `fk_idespeciepet` (`fk_idespeciepet`);

--
-- Índices de tabela `redessociais`
--
ALTER TABLE `redessociais`
  ADD PRIMARY KEY (`idredesocial`),
  ADD KEY `fk_idong` (`fk_idong`);

--
-- Índices de tabela `responsaveis`
--
ALTER TABLE `responsaveis`
  ADD PRIMARY KEY (`idresponsavel`),
  ADD UNIQUE KEY `fk_idusuario` (`fk_idusuario`),
  ADD UNIQUE KEY `fk_idong` (`fk_idong`),
  ADD UNIQUE KEY `fk_idong_2` (`fk_idong`);

--
-- Índices de tabela `ruas`
--
ALTER TABLE `ruas`
  ADD PRIMARY KEY (`idrua`),
  ADD KEY `fk_idbairro` (`fk_idbairro`);

--
-- Índices de tabela `sexo`
--
ALTER TABLE `sexo`
  ADD PRIMARY KEY (`idsexo`);

--
-- Índices de tabela `sexospet`
--
ALTER TABLE `sexospet`
  ADD PRIMARY KEY (`idsexopet`);

--
-- Índices de tabela `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`idstatus`);

--
-- Índices de tabela `tipos_usuario`
--
ALTER TABLE `tipos_usuario`
  ADD PRIMARY KEY (`idtipo`),
  ADD UNIQUE KEY `tipo` (`tipo`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idusuario`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `cpf` (`cpf`),
  ADD KEY `fk_idsexo` (`fk_idsexo`),
  ADD KEY `fk_idendereco` (`fk_idendereco`),
  ADD KEY `fk_idtipo` (`fk_idtipo`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `bairros`
--
ALTER TABLE `bairros`
  MODIFY `idbairro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `cidades`
--
ALTER TABLE `cidades`
  MODIFY `idcidade` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `enderecos`
--
ALTER TABLE `enderecos`
  MODIFY `idendereco` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `especiespet`
--
ALTER TABLE `especiespet`
  MODIFY `idespeciepet` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `estados`
--
ALTER TABLE `estados`
  MODIFY `idestado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de tabela `funcionarios`
--
ALTER TABLE `funcionarios`
  MODIFY `idfuncionario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `ongs`
--
ALTER TABLE `ongs`
  MODIFY `idong` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de tabela `ongsfavoritadas`
--
ALTER TABLE `ongsfavoritadas`
  MODIFY `idongfavoritada` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pets`
--
ALTER TABLE `pets`
  MODIFY `idpet` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `petsfavoritados`
--
ALTER TABLE `petsfavoritados`
  MODIFY `idpetfavoritado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `portespet`
--
ALTER TABLE `portespet`
  MODIFY `idportepet` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `racaspet`
--
ALTER TABLE `racaspet`
  MODIFY `idracapet` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `redessociais`
--
ALTER TABLE `redessociais`
  MODIFY `idredesocial` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `responsaveis`
--
ALTER TABLE `responsaveis`
  MODIFY `idresponsavel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de tabela `ruas`
--
ALTER TABLE `ruas`
  MODIFY `idrua` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `sexo`
--
ALTER TABLE `sexo`
  MODIFY `idsexo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `sexospet`
--
ALTER TABLE `sexospet`
  MODIFY `idsexopet` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `status`
--
ALTER TABLE `status`
  MODIFY `idstatus` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tipos_usuario`
--
ALTER TABLE `tipos_usuario`
  MODIFY `idtipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idusuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `bairros`
--
ALTER TABLE `bairros`
  ADD CONSTRAINT `bairros_ibfk_1` FOREIGN KEY (`fk_idcidade`) REFERENCES `cidades` (`idcidade`) ON DELETE CASCADE;

--
-- Restrições para tabelas `cidades`
--
ALTER TABLE `cidades`
  ADD CONSTRAINT `cidades_ibfk_1` FOREIGN KEY (`fk_idestado`) REFERENCES `estados` (`idestado`) ON DELETE CASCADE;

--
-- Restrições para tabelas `enderecos`
--
ALTER TABLE `enderecos`
  ADD CONSTRAINT `enderecos_ibfk_1` FOREIGN KEY (`fk_idcidade`) REFERENCES `cidades` (`idcidade`) ON DELETE CASCADE,
  ADD CONSTRAINT `enderecos_ibfk_2` FOREIGN KEY (`fk_idbairro`) REFERENCES `bairros` (`idbairro`) ON DELETE CASCADE,
  ADD CONSTRAINT `enderecos_ibfk_3` FOREIGN KEY (`fk_idrua`) REFERENCES `ruas` (`idrua`) ON DELETE CASCADE,
  ADD CONSTRAINT `enderecos_ibfk_4` FOREIGN KEY (`fk_idestado`) REFERENCES `estados` (`idestado`) ON DELETE CASCADE;

--
-- Restrições para tabelas `funcionarios`
--
ALTER TABLE `funcionarios`
  ADD CONSTRAINT `funcionarios_ibfk_1` FOREIGN KEY (`fk_idusuario`) REFERENCES `usuarios` (`idusuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `funcionarios_ibfk_2` FOREIGN KEY (`fk_idong`) REFERENCES `ongs` (`idong`) ON DELETE CASCADE,
  ADD CONSTRAINT `funcionarios_ibfk_3` FOREIGN KEY (`fk_idresponsavel`) REFERENCES `responsaveis` (`idresponsavel`) ON DELETE CASCADE;

--
-- Restrições para tabelas `ongs`
--
ALTER TABLE `ongs`
  ADD CONSTRAINT `FK_ONG_FUNCIONARIO` FOREIGN KEY (`fk_idfuncionarios`) REFERENCES `funcionarios` (`idfuncionario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_ONG_RESPONSAVEL` FOREIGN KEY (`fk_idresponsavel`) REFERENCES `responsaveis` (`idresponsavel`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ongs_ibfk_1` FOREIGN KEY (`fk_idendereco`) REFERENCES `enderecos` (`idendereco`) ON DELETE CASCADE,
  ADD CONSTRAINT `ongs_ibfk_2` FOREIGN KEY (`fk_idtipo`) REFERENCES `tipos_usuario` (`idtipo`) ON DELETE CASCADE;

--
-- Restrições para tabelas `ongsfavoritadas`
--
ALTER TABLE `ongsfavoritadas`
  ADD CONSTRAINT `ongsfavoritadas_ibfk_1` FOREIGN KEY (`fk_idusuario`) REFERENCES `usuarios` (`idusuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `ongsfavoritadas_ibfk_2` FOREIGN KEY (`fk_idong`) REFERENCES `ongs` (`idong`) ON DELETE CASCADE;

--
-- Restrições para tabelas `pets`
--
ALTER TABLE `pets`
  ADD CONSTRAINT `pets_ibfk_1` FOREIGN KEY (`fk_idsexopet`) REFERENCES `sexospet` (`idsexopet`) ON DELETE CASCADE,
  ADD CONSTRAINT `pets_ibfk_2` FOREIGN KEY (`fk_idespecie`) REFERENCES `especiespet` (`idespeciepet`) ON DELETE CASCADE,
  ADD CONSTRAINT `pets_ibfk_3` FOREIGN KEY (`fk_idraca`) REFERENCES `racaspet` (`idracapet`) ON DELETE CASCADE,
  ADD CONSTRAINT `pets_ibfk_4` FOREIGN KEY (`fk_idporte`) REFERENCES `portespet` (`idportepet`) ON DELETE CASCADE,
  ADD CONSTRAINT `pets_ibfk_5` FOREIGN KEY (`fk_idresponsavel`) REFERENCES `responsaveis` (`idresponsavel`) ON DELETE CASCADE,
  ADD CONSTRAINT `pets_ibfk_6` FOREIGN KEY (`fk_idong`) REFERENCES `ongs` (`idong`) ON DELETE CASCADE,
  ADD CONSTRAINT `pets_ibfk_7` FOREIGN KEY (`fk_idstatus`) REFERENCES `status` (`idstatus`) ON DELETE CASCADE;

--
-- Restrições para tabelas `petsfavoritados`
--
ALTER TABLE `petsfavoritados`
  ADD CONSTRAINT `petsfavoritados_ibfk_1` FOREIGN KEY (`fk_idusuario`) REFERENCES `usuarios` (`idusuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `petsfavoritados_ibfk_2` FOREIGN KEY (`fk_idpet`) REFERENCES `pets` (`idpet`) ON DELETE CASCADE;

--
-- Restrições para tabelas `racaspet`
--
ALTER TABLE `racaspet`
  ADD CONSTRAINT `racaspet_ibfk_1` FOREIGN KEY (`fk_idespeciepet`) REFERENCES `especiespet` (`idespeciepet`) ON DELETE CASCADE;

--
-- Restrições para tabelas `redessociais`
--
ALTER TABLE `redessociais`
  ADD CONSTRAINT `redessociais_ibfk_1` FOREIGN KEY (`fk_idong`) REFERENCES `ongs` (`idong`) ON DELETE CASCADE;

--
-- Restrições para tabelas `responsaveis`
--
ALTER TABLE `responsaveis`
  ADD CONSTRAINT `responsaveis_ibfk_1` FOREIGN KEY (`fk_idusuario`) REFERENCES `usuarios` (`idusuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `responsaveis_ibfk_2` FOREIGN KEY (`fk_idong`) REFERENCES `ongs` (`idong`) ON DELETE CASCADE;

--
-- Restrições para tabelas `ruas`
--
ALTER TABLE `ruas`
  ADD CONSTRAINT `ruas_ibfk_1` FOREIGN KEY (`fk_idbairro`) REFERENCES `bairros` (`idbairro`) ON DELETE CASCADE;

--
-- Restrições para tabelas `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`fk_idsexo`) REFERENCES `sexo` (`idsexo`) ON DELETE CASCADE,
  ADD CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`fk_idendereco`) REFERENCES `enderecos` (`idendereco`) ON DELETE CASCADE,
  ADD CONSTRAINT `usuarios_ibfk_3` FOREIGN KEY (`fk_idtipo`) REFERENCES `tipos_usuario` (`idtipo`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
