const Post = require(`../models/postModel`);
const User = require(`../models/userModel`);

//create post
const createPost = async(req, res, next) => {
    const {userId, postTopic, postContent} = req.body;

    const newPost = new Post({
        userId,
        postTopic,
        postContent
    });

    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);

    } catch(error) {
        res.status(400).json({message: error.message});

    }
}

//view post
const viewPost = async(req, res, next) => {
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId);
        res.status(200).send({status: "Post fetched", post});

        if(!post) {
            return res.status(400).json({message: 'Post not found'});
        }

    } catch(error) {
        return res.status(500).json({message: error.message});

    }
}

//view all posts
const allPosts = async (req, res, next) => {
    Post.find().then((posts) => {
        res.json(posts)

    }).catch((err) => {
        console.log(err)
    })
}

//update post
const updatePost = async (req, res, next) => {
    let postId = req.params.id;
    const { postTopic, postContent } = req.body;

    const updatePostData = {
        postTopic,
        postContent
    };

    try {
        const updated = await Post.findByIdAndUpdate(postId, updatePostData, { new: true });
        res.status(200).send({ status: "Post Updated", updated });
    } catch (err) {
        res.status(400).send({ status: "Error with updating data", error: err.message });
    }
};


//delete post
const deletePost = async (req, res, next) => {
    let postId = req.params.id;

    await Post.findByIdAndDelete(postId)
    .then(() => {
        res.status(200).send({status: "post removed"});

    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with deleting post", error: err.message});

    })
}


module.exports = {
    createPost,
    viewPost,
    allPosts,
    updatePost,
    deletePost
}
