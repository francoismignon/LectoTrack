import React from "react";

function BookCard(props) {
    return (
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <img class="w-full" src={props.book.cover_url} alt={props.book.title} />
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{props.book.title}</div>
                {props.book.Authors.map(author => (
                    <p class="text-gray-700 text-base">
                    {author.firstname} {author.lastname}
                </p>
                ))}
            </div>
        </div>
    );
}
export default BookCard;