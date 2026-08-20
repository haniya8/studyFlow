// controllers/subjectController.js
import { prisma } from '../db/prisma.js';

const getSubjects = async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany(
        {
            where : {userId : req.user.id},
        }
    );
    res.json(subjects)
  } catch (err) {
    console.error("Error Loading Subjects:", err);
    res.status(500).json({error:'Failed to fetch subjects.'})
  }
};

const createSubject = async (req, res) => {
  try {
    const {name,color} = req.body;
    if(!name || !color){
        return res.status(400).json({ error: 'Name and color are required.' });
    }
    const subject = await prisma.subject.create({
        data: {name,color, userId: req.user.id} 
    })
    res.status(201).json(subject);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create subject.' });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const {id} = req.params;
    const subject = await prisma.subject.findUnique({
        where : {id: Number(id)}
    });

    if(!subject || subject.userId !== req.user.id ){
      return res.status(404).json({ error: 'Subject not found.' });  
    }
    
    await prisma.subject.delete({
        where: {id:Number(id)}
    });
    res.status(204).send();   
    
  } catch (err) {
    if (err.code === 'P2039') {
      return res.status(409).json({ error: 'Cannot delete a subject that still has tasks. Delete or reassign its tasks first.' });
    }
    console.error('Delete Subject error:', err); //sent to server console
    res.status(500).json({error: "Failed to delete subject."}); //sent to client
  }
};

export { getSubjects, createSubject, deleteSubject };