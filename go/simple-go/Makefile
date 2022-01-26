.PHONY: compile run download

ODIR      := _output

$(ODIR):
	@mkdir -p $(ODIR)

compile: $(ODIR)
	GOOS=linux GOARCH=amd64 CGO_ENABLED=1 go build -o $(ODIR)/gosample main.go

run:
	go run main.go

download:
	go mod download
