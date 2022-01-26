package storage

type simpleStorage struct {
	data map[int]interface{}
}

func New() *simpleStorage {
	return &simpleStorage{
		data: map[int]interface{}{},
	}
}

func (s *simpleStorage) Store(key int, value interface{}) {
	s.data[key] = value
}

func (s *simpleStorage) Get(key int) (interface{}, bool) {
	v, found := s.data[key]
	return v, found
}

func (s *simpleStorage) All() interface{} {
	values := []interface{}{}

	for _, v := range s.data {
		values = append(values, v)
	}

	return values
}

func (s *simpleStorage) GetNextKey() int {
	return len(s.data) + 1
}
