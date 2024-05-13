// Description: This file contains the javascript code for truncating the text.
        const paragraphs = document.querySelectorAll('.truncate'); // Select all elements with the class 'truncate'
        const mdParagraphs = document.querySelectorAll('.truncate-md'); // Select all elements with the class 'truncate-md'
        const smParagraphs = document.querySelectorAll('.truncate-sm'); // Select all elements with the class 'truncate-sm'
        const maxLength = 140;
        const mdMaxLength = 111;
        const smMaxLength = 54;

    
        paragraphs.forEach(p => {
            let text = p.innerText;
            if (text.length > maxLength) {
                p.innerText = text.substr(0, maxLength) + '...'; // Add ellipsis after 140 characters
            }
        });

        mdParagraphs.forEach(p => {
            let text = p.innerText;
            if (text.length > mdMaxLength) {
                p.innerText = text.substr(0, mdMaxLength) + '...'; // Add ellipsis after 70 characters
            }
        });

        smParagraphs.forEach(p => {
            let text = p.innerText;
            if (text.length > smMaxLength) {
                p.innerText = text.substr(0, smMaxLength) + '...'; // Add ellipsis after 70 characters
            }
        });

